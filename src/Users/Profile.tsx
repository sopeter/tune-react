import * as client from "./client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {UserState} from "../Store";
import {resetUser} from "./reducer";

export default function Profile() {
  const currentUser = useSelector((state: UserState) => state.userReducer.user);
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();

  const isCurrentUser = uid === currentUser._id;
  const [profile, setProfile] = useState<any>({});

  const dispatch = useDispatch();

  const fetchProfile = async (userId: string) => {
    const profile = await client.profile(userId);
    setProfile(profile);
  };

  const logOut = async () => {
    await client.logout();
    dispatch(resetUser());
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
              isCurrentUser &&
              <div className="row">
                <div className="col">
                  <button onClick={() => navigate(`/Account/Profile/Edit/${uid}`)} className="btn btn-primary" type="button">
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