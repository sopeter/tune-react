
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import * as userClient from "./client";
export default function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const register = async () => {
    try {
      const newUser = await userClient.registerUser(user);
      navigate("/Tune/Account/Profile");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        value={user.username}
        type="text"
        className="form-control"
        placeholder="Username"
      />
      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        value={user.password}
        type="password"
        className="form-control"
        placeholder="Password"
      />
      <button onClick={register} className="btn btn-primary">
        Register
      </button>
      <Link to="/Tune/Account/Login">Login</Link>
    </div>
  );
}
