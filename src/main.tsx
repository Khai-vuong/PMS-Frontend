import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";
import Signup from "./Signup.tsx";
import Projectlist from "./pages/Projectlist/Projectlist.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
