import React from "react";
import { Routes, Route } from "react-router";
import Register from "./Users/Register";
import Login from "./Users/Login";
import { HashRouter } from "react-router-dom";
import Home from "./Home";
import TrackDetail from "./Tracks/TrackDetail";
import Profile from "./Users/ Profile";
import EditProfile from "./Users/EditProfile";

function App() {
  return (
    <>
      <h1 className="ms-4 my-2 mt-4 text-primary">Tune</h1>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Account/Register" element={<Register />} />
          <Route path="/Account/Login" element={<Login />} />
          <Route path="/Tune/Home" element={<Home />} />
          <Route path="/Tune/Track/:trackId" element={<TrackDetail />} />
          <Route path="/Account/Profile/:uid" element={<Profile />} />
          <Route path="/Account/Profile/Edit" element={<EditProfile />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
