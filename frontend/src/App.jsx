import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Editor from "./pages/Editorr";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const setToken = (token) => {
    localStorage.setItem("token", token);
    setIsLogged(true);
  };

  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/home" element={isLogged ? <Home /> : <Navigate to="/" />} />
        <Route path="/editor/:id" element={isLogged ? <Editor /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
