import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Pmconsole from "../../components/PMconsole/Pmconsole";
import Pagination from "../../components/Pagination";
import "./Lobby.css";
import { LobbyUserDTO } from "../../DTOs/LobbyUser.dto";
import { LobbyProjectDTO } from "../../DTOs/LobbyProject.dto";
import { LobbyTaskDTO, TaskDTO } from "../../DTOs/LobbyTask.dto";

const Lobby: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [pid] = useState(searchParams.get("pid"));
  const [userData, setUserData] = useState<LobbyUserDTO | null>(null);
  const [projectData, setProjectData] = useState<LobbyProjectDTO | null>(null);
  const [taskData, setTaskData] = useState<LobbyTaskDTO<TaskDTO> | null>(null);

  //Get initial data
  useEffect(() => {
    axios
      .get(`http://localhost:4000/lobby/init/?pid=${pid}`) // lobby/init Query pid
      .then((response) => {
        console.log(response.data);

        const { username, role } = response.data;
        setUserData({ username, role });

        const { pname, pdescription, pmodel, pphase } = response.data;
        setProjectData({ pname, pdescription, pmodel, pphase });

        setTaskData(response.data.PageDTO);

        if (role === "Project Manager") {
          document.querySelector(".body-lobby")?.classList.add("lobby-PM");
        } else {
          document.querySelector(".body-lobby")?.classList.add("lobby-member");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });



  }, []);

  const renderItem = (item: TaskDTO) => (
    <div
      key={item.tid}
      className="taskItem-lobby"
      onClick={() => taskClickHandling(item)}
    >
      <div className="name">{item.name}</div>
      <div className="description">{item.description}</div>
      <div className="assignee">{item.assignee}</div>
    </div>
  );

  const taskClickHandling = (item: TaskDTO): void => {
    const url = `/mr/?pid=${pid}&tid=${item.tid}`;
    navigate(url);
  };

  const pullAllCode = async () => {
    if (confirm("This will pull all files from this project, are you sure?")) {
      try {
        const response = await axios.get(
          `http://localhost:4000/file/downloadFromProject?pid=${pid}`,
          { responseType: "blob" }
        );

        const blob = new Blob([response.data], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `project_${pid}.zip`);
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error while downloading the file:", error);
        alert("Failed to pull code.");
      }
    } else {
      alert("Pulling code is canceled");
    }
  };

  const fetchPage = async (currentPage: number) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/lobby/tasks/?pid=${pid}&page=${currentPage}&pageSize=5`
      );
      setTaskData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div className="entire-lobby">
      <div className="header-lobby">
        <Header inforName={userData?.username || ""} />
      </div>
      <div className="body-lobby">
        <div className="sidebar-lobby">
          <h1>{projectData?.pname}</h1>
          <h3>{projectData?.pdescription}</h3>
          <h3>Phase: {projectData?.pphase || "Loading"}</h3>
        </div>
        <div className="maincontent-lobby">
          {userData?.role === "Project Manager" && (
            <div className="pm-console-lobby">
              <Pmconsole pid={pid || ""} />
            </div>
          )}

          <div className="tasklist-lobby">
            <h1>Tasklist</h1>
            <Pagination
              ListDTO={
                taskData || {
                  data: [],
                  metadata: {
                    pageCount: 0,
                    pageSize: 0,
                    currentPage: 0,
                    hasPreviousPage: false,
                    hasNextPage: false,
                  },
                }
              }
              fetchPage={fetchPage}
              renderItem={renderItem}
            />
          </div>

          <div className="filezone-lobby">
            <h1>Filezone</h1>
            <button onClick={pullAllCode}>Pull the code</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
