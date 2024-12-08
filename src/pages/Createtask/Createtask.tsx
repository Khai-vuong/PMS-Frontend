import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import "./Createtask.css";
import Header from "../../components/Header/Header";

const CreateTask: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState(() => {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    return now.toISOString().split("T")[0];
  });   //Default due date is 7 days from now
  const [username, setUsername] = useState("User Name");
  const [error, setError] = useState<string | null>(null);
  const rootURL = "http://localhost:4000";

  const [pid] = useState(searchParams.get("pid"));
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const url = rootURL + "/tasks/new";


    if (!token) {
      alert("You must be logged in to create a task.");
      return;
    }

    const pid = searchParams.get("pid");

    if (!pid) {
      alert("Project ID is missing from the URL.");
      return;
    }


    const taskData = {
      name: taskName,
      description: description,
      status: "Undone",
      assignee: assignee,
      due: dueDate,
    };

    taskData.due = new Date(dueDate).toISOString();


    try {
      const response = await axios.post(url, taskData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          pid: pid,
        },
      });

      console.log("Task created successfully:", response.data);
      alert("Task created successfully!");
      navigate(`/lobby?pid=${pid}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occurred");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error:", err);
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
  const gotoLobby = () => {
    window.location.href = `/lobby?pid=${pid}`;
  };

  useEffect(() => {
    initUsername();
  }, []);

  return (
    <>
      <Header inforName={username} />
      <div className="create-task-page">

        <button className="back-btn " onClick={gotoLobby}>
          Back to Lobby
        </button>

        <h2>Create Task Page</h2>

        <form onSubmit={handleSubmit} className="task-form">
          <label>Task name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          ></textarea>

          <label>Assignee</label>
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="Enter assignee name"
          />

          <label>Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default CreateTask;
