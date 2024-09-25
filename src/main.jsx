import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { Projects } from "./components/Projects.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Projects />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
