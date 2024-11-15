import { useState } from "react";
import axios from "axios";
import "./Createproject.css";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [model, setModel] = useState("Waterfall");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success message

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/projects",
        {
          projectName,
          model,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Project created successfully!");
    } catch (error) {
      setError("Failed to create project.");
    }
  };

  return (
    <div className="create-project-page">
      <header className="header">
        <img src="path/to/logo.png" alt="Logo" className="logo" />
        <div className="user-info">
          <div className="profile-pic">[User Pic]</div>
          <span className="username">Nguyen Van A</span>
        </div>
      </header>
      <h2>Create Project Page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleCreateProject} className="project-form">
        <label>Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />
        <label>Model</label>
        <div className="model-options">
          <button
            type="button"
            onClick={() => setModel("Waterfall")}
            className={model === "Waterfall" ? "active" : ""}
          >
            Waterfall
          </button>
          <button
            type="button"
            onClick={() => setModel("Scrum")}
            className={model === "Scrum" ? "active" : ""}
          >
            Scrum
          </button>
        </div>
        <div className="model-illustration">
          <img src="./Createproject.png" alt="Waterfall Model" />
          <p>{model} Model in Software Engineering</p>
        </div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
        ></textarea>
        <button type="submit" className="submit-btn">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
