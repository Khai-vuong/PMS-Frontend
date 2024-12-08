import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Createamerge.css";
import Header from "../../components/Header/Header";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateMergePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("User Name");
  const rootUrl = "http://localhost:4000";

  const [taskName, setTaskName] = useState("");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const tid = searchParams.get("tid");
  const pid = searchParams.get("pid");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const gotoLobby = () => {
    navigate(`/lobby/?pid=${pid}`);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    alert('please wait, it may take a while');

    let mrid = "";

    const token = localStorage.getItem("token") || "";
    const url = `http://localhost:4000/mr/create?tid=${tid}`;

    if (!token) {
      alert("You must be logged in to submit the request.");
      return;
    }

    //Upload the file
    if (files.length > 0) {
      if (files.length > 1) {
        alert(
          "This app version can only upload 1 file, the first file chosen will be uploaded. Sorry :<"
        );
      }

      const fileUploadUrl = rootUrl + "/file/upload";
      const fileFormData = new FormData();
      const selectedFile = files[0];

      fileFormData.append("task_id", tid || "");
      fileFormData.append("project_id", pid || "");
      fileFormData.append("file", selectedFile);

      try {
        const fileUploadResponse = await axios.post(
          fileUploadUrl,
          fileFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("File upload success:", fileUploadResponse.data);
      } catch (fileUploadError) {
        if (axios.isAxiosError(fileUploadError)) {
          setError(
            fileUploadError.response?.data.message ||
            "File upload error occurred"
          );
        } else {
          setError("An unexpected file upload error occurred.");
        }
        console.error("File upload error:", fileUploadError);
        return;
      }
    }


    //Create a Merge Request
    const formData = new FormData();
    formData.append("taskName", taskName);
    formData.append("comment", comment);
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      console.log("FormData content:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Success:", response.data);
      mrid = response.data.message.split(" ")[2];

      alert("Merge request submitted successfully!");
      gotoLobby();

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occurred");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error:", err);
    }

    //Announce the merge request
    const announceUrl =
      rootUrl + `/mail/send-mr-to-pm?tid=${tid}&pid=${pid}&mrid=${mrid}`;
    try {
      const announceResponse = await axios.post(announceUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Announce success:", announceResponse.data);
    } catch (announceError) {
      console.error("Error announcing merge request:", announceError);
    }
  };

  const initUsername = async () => {
    try {
      const response = await axios.get("http://localhost:4000/utils/username");
      setUsername(response.data);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  useEffect(() => {
    initUsername();
  }, []);

  useEffect(() => {
    const fetchTaskName = async () => {
      if (tid) {
        try {
          const response = await axios.get(
            `http://localhost:4000/tasks/name/?tid=${tid}`
          );
          setTaskName(response.data.name);
        } catch (err) {
          setError("Failed to fetch task name.");
        }
      } else {
        setError("Task ID (tid) is missing.");
      }
    };

    fetchTaskName();
  }, [tid]);

  return (
    <>
      <Header inforName={username} />
      <div className="createmerge-container">
        <header className="createmerge-header">
          <img src="path_to_logo" alt="logo" className="logo" />
          <div className="user-info">
            <img
              src="/src/pages/Createproject/image.png"
              alt="user"
              className="user-image"
            />
            <span className="username">user</span>
          </div>
        </header>
        <h1 className="createmerge-title">Create Merge Request</h1>
        <button className="createmerge-back" onClick={gotoLobby}>Back to lobby</button>
        <form onSubmit={handleSubmit} className="createmerge-form">
          <label>Task name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="input-field not-allowed"
            placeholder={taskName}
            disabled
          />

          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input-field"
          />

          <label>Attach files</label>
          <div className="file-upload">
            <input type="file" multiple onChange={handleFileChange} />
            <div className="file-icons"></div>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default CreateMergePage;
