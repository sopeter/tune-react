import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Register from "./Users/Register";
import Login from "./Users/Login";
import { HashRouter } from "react-router-dom";
import UsersPages from "./Users/UsersPages";

function App() {
  return (
    <>
      <h1>Home</h1>
      <HashRouter>
        <Routes>
          <Route path="/" element={<UsersPages />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
