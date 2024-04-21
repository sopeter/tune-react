import TrackDisplayCard from "../TrackDisplayCard";
import {useEffect, useState} from "react";
import * as spotifyClient from "../../Spotify/client";
import * as tuneClient from "../../Tune/client";
import * as usersClient from "../../Users/client";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserState} from "../../Store";

export default function TrackDetail() {
  const [track, setTrack] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<any[]>([]);
  const {trackId} = useParams();
  const user = useSelector((state: UserState) => state.userReducer.user);

  const fetchTrack = async () => {
    const users: any[] = await usersClient.getUsers();
    const userMap = users.reduce((map, obj) => {
      map[obj._id] = obj.username;
      return map;
    }, {});
    const track = await spotifyClient.getTrack(trackId);
    setTrack(track);
    if (user._id !== null) {
      const liked = await tuneClient.areLikedTracks([track.id]);
      setIsLiked(liked[0]);
    } else {
      setIsLiked(false);
    }
    const trackInfo = await tuneClient.getTrackBySpotifyId(track.id);
    if (trackInfo.length > 0) {
      const trackLikes = trackInfo[0].likedBy;
      setLikes(trackLikes.map((uid: any) => [uid, userMap[uid]]));
    }
  };

  useEffect(() => {
    fetchTrack();
  });

  return (
      <div className="d-flex container py-4">
        {track && <div className="col-4"><TrackDisplayCard track={track} liked={isLiked}
                                                           updateLikes={fetchTrack}/></div>}
        {track && <div className="px-4 col-8">
          <iframe src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                  title={track.id}
                  width="100%" height="152" frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"></iframe>
          <div className="border border-2 rounded p-2 my-3">
            <div className="d-flex p-2">
              <div className="col-8">
                <h1 className="text-primary">{track.name}</h1>
                <h3 className="text-secondary">{track.artists.reduce((aList: any, a: any) => {
                  aList += a.name + ', ';
                  return aList;
                }, []).slice(0, -2)}</h3>
                <br/>
                <h4>Album: {track.album.name}</h4>
                <h4>Released: {track.album.release_date}</h4>
                <h4 className="text-primary">Likes: {likes ? likes.length : 0}</h4>
              </div>
              {likes.length > 0 && (<div className="col-4 mt-2">
                <h4>Liked by:</h4>
                <ul className="list-group">
                  {likes.map(([uid, username]) => (
                      <li key={uid} className="list-group-item">
                        {user && user._id ?
                            <Link className="text-body text-nowrap text-truncate"
                                  to={`/Account/Profile/${uid}`}>{username}</Link> :
                            username
                        }
                      </li>
                  ))}
                </ul>
              </div>)}
            </div>
          </div>
        </div>}
      </div>
  );
}