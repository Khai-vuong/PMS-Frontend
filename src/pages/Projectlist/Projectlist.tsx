import "./Projectlist.css";
import axios from "axios";
import { useEffect, useState } from "react";
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
  const [username, setUsername] = useState("User Name");
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
  const routeToCreateProject = () => {
    navigate("/project/create", { replace: true });
  };

  const initUsername = async () => {
    try {
      const response = await axios.get("http://localhost:4000/utils/username");
      setUsername(response.data);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  }

  useEffect(() => {
    initUsername();
  }, []);

  return (
    <>
      <Header inforName={username} />
      <div className="container-list">
        <div className="title">
          <h1>Project List</h1>
        </div>
        <table className='body-projectlist'>
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
                  Đang tìm dự án...
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.pid} onClick={() => handleProjectClick(project.pid)} className="projectItem-projectList">
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
          <div onClick={routeToCreateProject}>Create Project</div>
        </div>
      </div>
    </>
  );
};
export default Projectlist;
