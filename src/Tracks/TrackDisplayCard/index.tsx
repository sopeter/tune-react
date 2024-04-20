import {FaRegHeart, FaHeart} from "react-icons/fa";
import * as tuneClient from "../../Tune/client";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function TrackDisplay({track, liked}: { track: any, liked: boolean }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const likeTrack = async (track: any) => {
    await tuneClient.likeTrack(track);
    setIsLiked(true);
  }

  const unlikeTrack = async (track: any) => {
    await tuneClient.unlikeTrack(track.id);
    setIsLiked(false);
  }

  return (
      <div className="card" style={{width: "18rem"}}>
        <img src={track.album.image} className="card-img-top" alt={track.name}
             onClick={() => navigate(`/Tune/Track/${track.id}`)}/>
        <div className="card-body">
          <h5 className="card-title text-nowrap text-truncate">{track.name}</h5>
          <p className="card-text">{track.artists[0].name}</p>
          <button
              onClick={() => {
                isLiked ? unlikeTrack(track) : likeTrack(track);
              }}
              className="float-end btn text-primary"
          >
            {isLiked ? <FaHeart style={{fontSize: "30px"}}/> :
                <FaRegHeart style={{fontSize: "30px"}}/>}
          </button>
        </div>
      </div>
  )
}