import "./Projectlist.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectsListDto } from "../../../DTOs/project-list.dto"
import Header from "../../components/Header/Header";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Projectlist = () => {
  const [projects, setProjects] = useState<ProjectsListDto[]>([]);

  const navigate = useNavigate();

  const toLobby = (pid: string): void => {
    navigate(`/lobby/init/?pid=${pid}`);
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/projects/list")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []);

  const handleProjectClick = (id: string | undefined) => {
    if (id !== undefined) {
      console.log("Project ID:", id);
      toLobby(id);
    }
  };



  return (
    <>
    <Header inforName="Dương Trọng Khôi"/>
      <div className="container-list">
        <div className="title">
          <h1>Project List</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Model</th>
              <th>Phase</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>
                  Không có dự án nào
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.pid} onClick={() => handleProjectClick(project.pid)}>
                  <td>{project.name}</td>
                  <td>{project.role}</td>
                  <td>{project.model}</td>
                  <td>{project.phase}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="create-button">
          <a href="">Create Project</a>
        </div>
      </div>
    </>
  );
};
export default Projectlist;
