import * as client from "./client";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router";
import {
  BsEyeFill,
  BsEyeSlashFill
} from "react-icons/bs"

export default function EditProfile() {
  // TODO: implement Redux
  const {uid} = useParams<{ uid: string }>();
  const currentUser = {_id: "66243235b36f3bce259d611f"};
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>({});
  const [isPwHidden, setIsPwHidden] = useState(true);

  const fetchProfile = async () => {
    const profile = await client.profile(uid!);
    setProfile(profile);
  };

  const isCurrentUser = uid === currentUser._id;

  const submitEdit = async () => {
    await client.updateUser(profile);
    navigate(`/Account/Profile/${uid}`)
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
      <div>
        <div className="container-fluid align-items-center min-vh-75">
          <h1>Edit Profile</h1>
          {isCurrentUser && (
              <div>
                <label htmlFor="profile-firstName-form">First Name</label>
                <input
                    className="form-control"
                    type="text"
                    id="profile-firstName-form"
                    value={profile.firstName}
                    onChange={(e) =>
                        setProfile({...profile, firstName: e.target.value})
                    }
                />
                <label htmlFor="profile-lastName-form">Last Name</label>
                <input
                    className="form-control"
                    type="text"
                    id="profile-lastName-form"
                    value={profile.lastName}
                    onChange={(e) =>
                        setProfile({...profile, lastName: e.target.value})
                    }
                />
                <label htmlFor="profile-username-form">Username</label>
                <input
                    className="form-control"
                    type="text"
                    id="profile-username-form"
                    value={profile.username}
                    onChange={(e) =>
                        setProfile({...profile, username: e.target.value})
                    }
                />
                <label htmlFor="profile-password-form">Password</label>
                <input
                    className="form-control"
                    type={isPwHidden ? "password" : "text"}
                    id="profile-password-form"
                    value={profile.password}
                    onChange={(e) =>
                        setProfile({...profile, password: e.target.value})
                    }
                />

                <button onClick={() => setIsPwHidden(!isPwHidden)}>
                  {isPwHidden ? <BsEyeFill/> : <BsEyeSlashFill/>}
                </button>
                <br/>
                <label htmlFor="profile-email-form">Email</label>
                <input
                    className="form-control"
                    type="email"
                    id="profile-email-form"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
                <label htmlFor="profile-role-form">Role</label>
                <select
                    className="form-control"
                    id="profile-role-form"
                    onChange={(e) => setProfile({...profile, role: e.target.value})}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="ARTIST">Artist</option>
                </select>

                <button className="btn btn-primary w-100 me-2" type="button" onClick={submitEdit}>
                  Save
                </button>
              </div>
          )}
        </div>
      </div>
  );
}