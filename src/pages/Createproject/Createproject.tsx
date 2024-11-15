import React, { useState } from "react";
import "./Createproject.css";

const CreateProject: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [model, setModel] = useState("Waterfall");
  const [description, setDescription] = useState("");
  const [modelImage, setModelImage] = useState(
    "/src/pages/Createproject/waterfall.png"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = ""; 
    const url = ""; 

    const projectData = {
      projectName,
      model,
      description,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Project created successfully:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the project.");
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

  return (
    <div className="create-project-page">
      <header className="header">
        <img src="path/to/logo.png" alt="Logo" className="logo" />
        <div className="user-info">
          <div className="profile-pic">
            <img src="/src/pages/Createproject/image.png" alt="User Pic" />
          </div>
          <span className="username">Nguyen Van A</span>
        </div>
      </header>

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
    </div>
  );
};

export default CreateProject;
