import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser("");
    setPwd("");
    setSuccess(true);

    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        username: user,
        password: pwd,
      });
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response?.status;
          const message =
            error.response?.data?.message || "Registration failed";

          if (status === 400) {
            setErrMsg("Missing Username or Password: " + message);
          } else if (status === 401) {
            setErrMsg("Unauthorized: " + message);
          } else {
            setErrMsg("Registration failed: " + message);
          }
          alert(errMsg);
        } else if (error.request) {
          setErrMsg("No response from the server. Please try again later.");
          alert(errMsg);
        } else {
          setErrMsg("Error in setting up the request: " + error.message);
          alert(errMsg);
        }
      }
      errRef.current?.focus();
    } finally {
      setSuccess(true);
      setUser("");
      setPwd("");
    }
  };

  return (
    <>
      {success ? (
        <div className="wrapper">
          <div className="success">
            <h1>Sign up succesfull</h1>
            <div className="gohome">
              <a href="/">Go to home</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="table">
            <div className="create">Create your account</div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <div className="buttons">
                <a id = "back" href="/" className="button">Back</a>
                <input id="Create" type="submit" value="Create" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
