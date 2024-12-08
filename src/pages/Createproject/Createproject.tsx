import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Createproject.css";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const CreateProject: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [model, setModel] = useState("Waterfall");
  const [description, setDescription] = useState("");
  const [modelImage, setModelImage] = useState(

    "/src/pages/Createproject/waterfall.png"
  );

  const navigate = useNavigate();
  const rootUrl = "http://localhost:4000";
  const [username, setUsername] = useState("User Name");
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token") || "";

  const gotoProjectList = () => { navigate("/projects/list"); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = "http://localhost:4000/projects/create";

    if (!token) {
      alert("You must be logged in to create a project.");
      return;
    }

    const projectData = {
      name: projectName,
      model: model,
      description: description,
      phase: "Starting",
    };

    try {
      const response = await axios.post(url, projectData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Project created successfully:", response.data);
      gotoProjectList();

      alert("Project created successfully!");
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
  const handleModelChange = (selectedModel: string) => {
    setModel(selectedModel);
    setModelImage(
      selectedModel === "Waterfall"
        ? "/src/pages/Createproject/waterfall.png"
        : "/src/pages/Createproject/scrum.png"
    );
  };

  useEffect(() => {
    initUsername();

    if (!token) {
      alert("You are not logged in.");
    }
  }, [token]);

  return (

    <>
      <Header inforName={username} />
      <div className="create-project-page">
        <button className="projectList-back" onClick={gotoProjectList}>
          Back
        </button>
        <h2>Create Project Page</h2>

        <form onSubmit={handleSubmit} className="project-form">
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
              onClick={() => handleModelChange("Waterfall")}
              className={model === "Waterfall" ? "active" : ""}
            >
              Waterfall
            </button>
            <button
              type="button"
              onClick={() => handleModelChange("Scrum")}
              className={model === "Scrum" ? "active" : ""}
            >
              Scrum
            </button>
          </div>
          <div className="model-illustration">
            <img src={modelImage} alt={`${model} Model`} />
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

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default CreateProject;
