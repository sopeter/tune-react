import {FaRegHeart, FaHeart} from "react-icons/fa";
import * as tuneClient from "../../Tune/client";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserState} from "../../Store";

export default function TrackDisplay({track, liked, updateLikes, color = 'primary'}: {
  track: any,
  liked: boolean,
  updateLikes?: Function,
  color?: string
}) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: UserState) => state.userReducer.user);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const likeTrack = async (track: any) => {
    if (user._id !== null) {
      await tuneClient.likeTrack(track);
      setIsLiked(true);
      if (updateLikes) {
        updateLikes();
      }
    }
  }

  const unlikeTrack = async (track: any) => {
    if (user._id !== null) {
      await tuneClient.unlikeTrack(track.id);
      setIsLiked(false);
      if (updateLikes) {
        updateLikes();
      }
    }
  }

  return (
      <div className="card" style={{width: "18rem"}}>
        <img src={track.album.image} className="card-img-top" alt={track.name}
             onClick={() => navigate(`/Tune/Track/${track.id}`)}/>
        <div className="card-body">
          <h5 className="card-title text-nowrap text-truncate">{track.name}</h5>
          <p className="card-text">{track.artists[0].name}</p>
          {user && user._id && (
              <button
                  onClick={() => {
                    isLiked ? unlikeTrack(track) : likeTrack(track);
                  }}
                  className={"float-end btn text-" + color}
              >
                {isLiked ? <FaHeart style={{fontSize: "30px"}}/> :
                    <FaRegHeart style={{fontSize: "30px"}}/>}
              </button>
          )}
        </div>
      </div>
  )
}