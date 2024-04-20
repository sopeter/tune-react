import * as client from "./client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function Profile() {
  // TODO: implement Redux
  const { currentUser } = { currentUser: "a1234124" };
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>({});

  const fetchProfile = async (userId: string) => {
    const profile = await client.profile(userId);
    setProfile(profile);
  };

  const logOut = async () => {
    await client.logout();
    navigate("/");
  }

  useEffect(() => {
    if (uid) {
      fetchProfile(uid);
    }
  }, [uid]);

  return (
      <div>
        <div className="container-fluid min-vh-100 ">
          <h1>Profile</h1>
          <div className="row">
            <div className="col">
              Profile Picture
            </div>
            <div className="col">
              {profile.likedTracks === undefined ? 0 : profile.likedTracks.length} Liked Tracks
            </div>
            <div className="col">
              {profile.following === undefined ? 0 : profile.following.length} Following
            </div>
            <div className="col">
              {profile.followers === undefined ? 0 : profile.followers.length} Followers
            </div>
          </div>
          <div className="row" >
            <div className="col">
              <strong>{profile.firstName} {profile.lastName}</strong>
            </div>
          </div>
          {
            currentUser &&
              <div className="row">
                <div className="col">
                  <button onClick={() => navigate(`/Account/Profile/Edit`)} className="btn btn-primary" type="button">
                    Edit Profile
                  </button>
                </div>
                <div className="col">
                  <button onClick={logOut} className="btn btn-primary" type="button">
                    Log Out
                  </button>
                </div>
              </div>
          }
          <div className="row ">
            <div className="col">
              Liked Tracks
              <br/>
              LIKED TRACKS COMPONENT
            </div>
          </div>
        </div>
      </div>
  );
}