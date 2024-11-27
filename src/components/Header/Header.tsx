import React from "react";
import { useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  inforName: string;
}
const Header: React.FC<HeaderProps> = ({ inforName }) => {  
    useEffect(() => {
      // Tạo một thẻ <link> để chèn Font Awesome
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }, []);

    const navigate = useNavigate();
    const routeToEmail = () => {
      navigate("/mail", { replace: true });
    };

    const routeToHomepage = () => {
      navigate("/", { replace: true });
    };
    const handleLogout = () => {
      localStorage.removeItem("token");
      routeToHomepage();
   };
  return (
    <>
        <div className="header-layout">
          <img src="/logo.png" alt="ICON" />
        
            <div className="infor">
              <div className="name">{inforName}</div>
              <img src="/imgp5.jpg" alt="img-profile" />
            </div>
            <button onClick={routeToEmail} className="mail-header"> Email</button>
            <button  onClick={handleLogout } className="logout-bt">
           
              <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
            </button>
          </div>
    </>
  );
};

export default Header;
