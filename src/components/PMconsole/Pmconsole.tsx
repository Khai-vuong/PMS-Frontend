import "./Pmconsole.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  pid: string;
}

const Pmconsole: React.FC<HeaderProps> = ({ pid }) => {
  const [tasks, setTasks] = useState();

  const navigate = useNavigate();

  const toCreateTask = (): void => {
    navigate(`/task/create/?pid=${pid}`);
  };

  const nextPhase = (): void => {
    axios
      .post(`http://localhost:4000/projects/next-phase`, { pid })
      .then((response) => {
        console.log("Next phase successful:", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi chuyển sang giai đoạn tiếp theo:", error);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/projects/tasks", { params: { pid } })
  //     .then((response) => {
  //       setTasks(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi lấy dữ liệu:", error);
  //     });
  // }, [pid]);

  return (
    <>
      <div className="pm-container">
        <div className="pm-buttons">
          <div className="authorize"  >Authorize</div>
          <div className="right-buttons">
            <div className="pm-create" onClick={toCreateTask}>Create task</div>
            <div className="next-phase" onClick={nextPhase}>Next Phase</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pmconsole;
    