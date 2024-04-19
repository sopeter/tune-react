import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Register from "./Users/Register";
import Login from "./Users/Login";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Home</h1>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Account/Register" element={<Register />} />
          <Route path="/Account/Login" element={<Login />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
