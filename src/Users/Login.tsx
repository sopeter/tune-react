import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import * as userClient from "./client";
import "./index.css";

export default function Login() {
  const [user, setUser] = useState({username: "", password: ""});
  const navigate = useNavigate();
  const login = async () => {
    try {
      const newUser = await userClient.loginUser(user);
      navigate("/Tune/Account/Profile");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
      <div className="d-flex align-items-center py-4">
        <div className="m-auto login-form">
          <h1>Login</h1>
          <div className="form-floating">
            <input
                onChange={(e) => setUser({...user, username: e.target.value})}
                value={user.username}
                type="text"
                className="form-control"
                placeholder="Username"
                id="floatingUsername"
            />
            <label htmlFor="floatingUsername">Username</label>
          </div>
          <div className="form-floating my-1">
            <input
                onChange={(e) => setUser({...user, password: e.target.value})}
                value={user.password}
                type="password"
                className="form-control"
                placeholder="Password"
                id="floatingPassword"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button onClick={login} className="btn btn-primary w-100 py-2 my-1" type="submit">
            Login
          </button>
          <Link to="/Account/Register">
            <button className="btn btn-primary w-100 py-2">
              Don't have an account? Register!
            </button>
          </Link>
        </div>
      </div>
  );
}
