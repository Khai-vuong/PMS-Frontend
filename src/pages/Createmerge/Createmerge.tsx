import React, { useState } from "react";
import "./Createamerge.css";

const Createmerge: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = ""; 
    const url = ""; 

    // Prepare the form data
    const formData = new FormData();
    formData.append("taskName", taskName);
    formData.append("comment", comment);
    files.forEach((file, index) => {
      formData.append(`file${index}`, file); // Append each file
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the request.");
    }
  };

  return (
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
      <form onSubmit={handleSubmit} className="createmerge-form">
        <label>Task name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="input-field"
          required
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
    </div>
  );
};

export default Createmerge;
