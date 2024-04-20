import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Register from "./Users/Register";
import Login from "./Users/Login";
import { HashRouter } from "react-router-dom";
import Home from "./Home";
import TrackDetail from "./Tracks/TrackDetail";

function App() {
  return (
    <>
      <h1>Home</h1>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Account/Register" element={<Register />} />
          <Route path="/Account/Login" element={<Login />} />
          <Route path="/Tune/Account/Profile" element={<Home />} />
          <Route path="/Tune/Track/:trackId" element={<TrackDetail />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
