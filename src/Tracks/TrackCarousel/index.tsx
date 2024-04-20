import TrackDisplayCard from "../TrackDisplayCard";
import {useEffect, useState} from "react";
import * as tuneClient from "../../Tune/client";
import "./index.css"

export default function TrackCarousel({tracks}: {tracks: any[]}) {
  const [likedTracks, setLikedTracks] = useState<any[]>([]);

  const fetchLikes = async () => {
    const likes = await tuneClient.areLikedTracks(tracks.map((t: any) => t.id));
    setLikedTracks(likes);
  }

  useEffect(() => {
    fetchLikes();
  }, [tracks]);

  return (
      <div className="card-group">
        <ul className="list-group list-group-horizontal">
          {tracks && likedTracks && tracks.map((track: any, i: number) => (
              <li key={track.id} className="list-group-item border-0">
                <TrackDisplayCard track={track} liked={likedTracks[i]}/>
              </li>
          ))}
        </ul>
      </div>
  )
}