import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

import * as userClient from "./client";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });
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
      <div className="d-flex align-items-center py-4">
        <div className="m-auto login-form">
          <h1>Register</h1>
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
          <div className="form-floating my-1">
            <input
                onChange={(e) => setUser({...user, firstName: e.target.value})}
                value={user.firstName}
                type="text"
                className="form-control"
                placeholder="First Name"
                id="floatingFirstName"
            />
            <label htmlFor="floatingFirstName">First Name</label>
          </div>
          <div className="form-floating my-1">
            <input
                onChange={(e) => setUser({...user, lastName: e.target.value})}
                value={user.lastName}
                type="password"
                className="form-control"
                placeholder="Last Name"
                id="floatingLastName"
            />
            <label htmlFor="floatingLastName">Last Name</label>
          </div>
          <div className="form-floating my-1">
            <input
                onChange={(e) => setUser({...user, email: e.target.value})}
                value={user.email}
                type="email"
                className="form-control"
                placeholder="Email"
                id="floatingEmail"
            />
            <label htmlFor="floatingEmail">Email</label>
          </div>
          <button onClick={register} className="btn btn-primary w-100 py-2 my-1" type="submit">
            Register
          </button>
          <Link to="/Account/Login">
            <button className="btn btn-primary w-100 py-2">
              Already have an account? Login!
            </button>
          </Link>
        </div>
      </div>
  );
}
