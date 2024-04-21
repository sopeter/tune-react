import {useEffect, useState} from "react";
import * as TuneClient from "./client";
import * as UserClient from "../Users/client";
import {
  BsArrowRight,
  BsTrash3Fill
} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

export default function AdminPage() {
  const currentUser = { firstName: "Peter", lastName: "So", role: "ADMIN"}
  const [users, setUsers] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [tableData, setTableData] = useState("users");
  const navigate = useNavigate();
  const [role, setRole] = useState("*");

  const deleteUser = async (userId: string) => {
    try {
      await UserClient.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUsers = async () => {
    switch (role) {
      case "*" : {
        const users = await UserClient.getUsers();
        setUsers(users);
        break;
      }
      case "USER" : {
        const users = await UserClient.getUsersByRole(role);
        setUsers(users);
        break
      }
      case "ADMIN" : {
        const users = await UserClient.getUsersByRole(role);
        setUsers(users);
        break
      }
      case "ARTIST" : {
        const users = await UserClient.getUsersByRole(role);
        setUsers(users);
        break
      }
    }
  };

  const fetchTracks = async () => {
    const tracks = await TuneClient.getAllTracks();
    setTracks(tracks);
  };

  useEffect(() => {
    fetchUsers();
  }, [role]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const getUserTable = () => {
    return (
        <div>
        <h1>Users</h1>
          <div className="mt-4 d-flex float-end">
            <h4 className="me-2 text-nowrap">Filter By Role:</h4>
            <select
            onChange={(e) => setRole(e.target.value)}
            value={role || "*"}
            className="form-control">
              <option value="*">*</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="ARTIST">Artist</option>
            </select>
          </div>
        <table className="table">
          <thead>
          <tr>
            <td>
              <strong>ID</strong>
            </td>
            <td>
              <strong>Username</strong>
            </td>
            <td>
              <strong>Name</strong>
            </td>
            <td>
              <strong>Role</strong>
            </td>
            <td>
              <strong>Actions</strong>
            </td>
          </tr>
          </thead>
          <tbody>
          {users.map((user: any) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.role}</td>
                <td className="text-nowrap">
                  <button className="btn btn-danger me-2">
                    <BsTrash3Fill onClick={() => deleteUser(user)} />
                  </button>
                  <button className="btn btn-success">
                    <BsArrowRight onClick={() => navigate(`/Account/Profile/${user._id}`)} />
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        </div>
    );
  };

  const getTrackTable = () => {
    return (
        <div>
          <h1>Tracks</h1>
          <table className="table">
            <thead>
            <tr>
              <td>
                <strong>ID</strong>
              </td>
              <td>
                <strong>Name</strong>
              </td>
              <td>
                <strong>Likes</strong>
              </td>
              <td>
                <strong>Actions</strong>
              </td>
            </tr>
            </thead>
            <tbody>
            {tracks.map((track: any) => (
                <tr key={track._id}>
                  <td>{track._id}</td>
                  <td>{track.name}</td>
                  <td className="text-center">{track.likedBy === undefined ? 0 : track.likedBy.length}</td>
                  <td className="text-nowrap text-center">
                    <button className="btn btn-success">
                      <BsArrowRight onClick={() => navigate(`/Tune/Track/${track.id}`)} />
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
    );
  };

  return (
      <div className="container">
        <span>
          <h1><strong>Administrator Control</strong></h1>
        </span>
        <div className="d-flex my-4 justify-content-center">
          <button className="btn btn-primary me-4" onClick={() => setTableData("users")}>Users</button>
          <button className="btn btn-secondary" onClick={() => setTableData("tracks")}>Tracks</button>
        </div>
        {
          tableData === "users" && getUserTable()
        }
        {
            tableData === "tracks" && getTrackTable()
        }
      </div>
  )
}