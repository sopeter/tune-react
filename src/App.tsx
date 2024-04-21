import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Register from "./Users/Register";
import Login from "./Users/Login";
import { HashRouter } from "react-router-dom";
import Home from "./Home";
import TrackDetail from "./Tracks/TrackDetail";
import Profile from "./Users/Profile";
import EditProfile from "./Users/EditProfile";
import Navigation from "./Navigation";
import SpotifySearch from "./Spotify/search";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./Store";
import AdminPage from "./Tune/Admin";

function App() {
  return (
    <>
      <Provider store={store.store}>
        <PersistGate persistor={store.persistor} loading={null}>
          <HashRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Navigate to="/Tune/Home" />} />
              <Route path="/Account/Register" element={<Register />} />
              <Route path="/Account/Login" element={<Login />} />
              <Route path="/Tune/Home" element={<Home />} />
              <Route path="/Tune/Track/:trackId" element={<TrackDetail />} />
              <Route path="/Tune/Track/Search" element={<SpotifySearch />} />
              <Route
                path="/Tune/Track/Search/:query"
                element={<SpotifySearch />}
              />
              <Route path="/Account/Profile/:uid" element={<Profile />} />
              <Route
                path="/Account/Profile/Edit/:uid"
                element={<EditProfile />}
              />
              <Route path="/Tune/Admin" element={<AdminPage />} />
            </Routes>
          </HashRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
