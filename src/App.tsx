import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";
import Signup from "./pages/Signup/Signup.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";
import Login from "./pages/Login/Login.tsx";
import Projectlist from "./pages/Projectlist/Projectlist.tsx";
import Createproject from "./pages/Createproject/Createproject.tsx";
import Createtask from "./pages/Createtask/Createtask.tsx";
import Wilderness from "./pages/Wilderness/Wilderness.tsx";
import Createmerge from "./pages/Createmerge/Createmerge.tsx";
import Lobby from "./pages/Lobby/Lobby.tsx";
import DemoPage from "./pages/DemoPage/Demo.tsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/projects/list" element={<Projectlist />}></Route>
          <Route path="/projects/create" element={<Createproject />}></Route>
          <Route path="/task/create" element={<Createtask />}></Route>
          <Route path="/tasks/create-mr" element={<Createmerge />}></Route>
          <Route path="/project/create" element={<Createproject />}></Route>
          <Route path="/merge/create" element={<Createmerge />}></Route>
          <Route path="/lobby/*" element={<Lobby />}></Route>
          <Route path="/demo" element={<DemoPage />}></Route>

          <Route path="*" element={<Wilderness />}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
