import * as client from "./client";
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {UserState} from "../Store";
import {resetUser} from "./reducer";
import ProfileDataTable from "./ProfileDataTable";
import * as tuneClient from "../Tune/client";

export default function Profile() {
  const currentUser = useSelector((state: UserState) => state.userReducer.user);
  const {uid} = useParams<{ uid: string }>();
  const navigate = useNavigate();

  const isCurrentUser = uid === currentUser._id;
  const [profile, setProfile] = useState<any>({});
  const [tableType, setTableType] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const dispatch = useDispatch();

  const fetchProfile = async (userId: string) => {
    const profile = await client.profile(userId);
    setProfile(profile);
    if (profile && profile.followers) {
      setIsFollowing(profile.followers.includes(currentUser._id));
    }
  };

  const logOut = async () => {
    await client.logout();
    dispatch(resetUser());
    navigate("/");
  }

  useEffect(() => {
    if (uid) {
      setTableType("");
      setTableData([]);
      fetchProfile(uid);
    }
  }, [uid]);

  const followProfile = async () => {
    await tuneClient.followUser(uid);
    setIsFollowing(true);
    fetchProfile(uid!);
  }

  const unfollowProfile = async () => {
    await tuneClient.unfollowUser(uid);
    setIsFollowing(false);
    fetchProfile(uid!);
  }

  return (
      <div>
        <div className="container-fluid">
          <div className="container">
            <h1 className="my-4">Profile</h1>
            <div className="row">
              <div className="col">
                <h2><strong>{profile.firstName} {profile.lastName}</strong></h2>
              </div>
              <div className="col">
                <h4><strong>@{profile.username}</strong></h4>
              </div>
              <div className="col">
                <button
                    className={tableType === "tracks" ? "btn btn-primary" : "btn btn-outline-primary"}
                    onClick={() => {
                      setTableData(profile.likedTracks);
                      setTableType("tracks")
                    }}>
                  {profile.likedTracks === undefined ? 0 : profile.likedTracks.length} Liked Tracks
                </button>
              </div>
              <div className="col">
                <button
                    className={tableType === "following" ? "btn btn-primary" : "btn btn-outline-primary"}
                    onClick={() => {
                      setTableData(profile.following);
                      setTableType("following")
                    }}>
                  {profile.following === undefined ? 0 : profile.following.length} Following
                </button>
              </div>
              <div className="col">
                <button
                    className={tableType === "followers" ? "btn btn-primary" : "btn btn-outline-primary"}
                    onClick={() => {
                      setTableData(profile.followers);
                      setTableType("followers")
                    }}>
                  {profile.followers === undefined ? 0 : profile.followers.length} Followers
                </button>
              </div>
            </div>
            {!isCurrentUser && (
                <button
                    className="btn btn-primary mt-2"
                    onClick={isFollowing ?
                        unfollowProfile :
                        followProfile}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            )}
            <div className="mt-4">
              {
                ProfileDataTable(tableType, tableData)
              }
            </div>

            {
                isCurrentUser &&
                <div className="d-flex justify-content-center mt-4">
                  <button onClick={() => navigate(`/Account/Profile/Edit/${uid}`)}
                          className="btn btn-primary mx-4" type="button">
                    Edit Profile
                  </button>
                  <button onClick={logOut} className="btn btn-danger mx-4" type="button">
                    Log Out
                  </button>
                </div>
            }
          </div>
        </div>
      </div>
  );
}