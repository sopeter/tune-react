import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {UserState} from "../Store";

export default function Navigation() {
  const user = useSelector((state: UserState) => state.userReducer.user);
  const {pathname} = useLocation();
  const [currUser, setCurrUser] = useState(user);
  const [path, setPath] = useState(pathname);

  useEffect(() => {
    setCurrUser(user);
  }, [user]);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const secureLinks = [
    {label: 'Home', location: '/Tune/Home'},
    {label: 'Search', location: '/Tune/Track/Search'},
    {label: 'Profile', location: `/Account/Profile/${currUser._id}`},
  ];

  const unsecureLinks = [
    {label: 'Home', location: '/Tune/Home'},
    {label: 'Search', location: '/Tune/Track/Search'},
    {label: 'Login', location: '/Account/Login'},
  ];

  return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <a className="ms-4 navbar-brand text-primary">Tune</a>
        <div>
          <ul className="navbar-nav">
            {currUser._id !== null ? secureLinks.map((link, i) => (
                <li key={link.label} className="nav-item">
                  <Link className="nav-link" to={link.location}>{link.label}</Link>
                </li>
            )) : unsecureLinks.map((link, i) => (
                <li key={link.label}
                    className="nav-item">
                  <Link
                      className={path.includes(link.label) ? "font-weight-bold nav-link active" : "nav-link"}
                      to={link.location}>{link.label}</Link>
                </li>
            ))}
          </ul>
        </div>
      </nav>
  );
}