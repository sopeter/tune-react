import TrackDisplayCard from "../TrackDisplayCard";
import {useEffect, useState} from "react";
import * as tuneClient from "../../Tune/client";
import "./index.css"

export default function TrackCarousel({tracks, color}: {tracks: any[], color?: string}) {
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
                <TrackDisplayCard track={track} liked={likedTracks[i]} color={color}/>
              </li>
          ))}
        </ul>
      </div>
  )
}