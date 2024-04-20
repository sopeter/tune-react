import {useEffect, useState} from "react";
import * as spotifyClient from "../Spotify/client";
import * as tuneClient from "../Tune/client";
import TrackDisplay from "../Tracks/TrackDisplay";
import "./index.css";

export default function Home() {

  const [topTracks, setTopTracks] = useState<any>([]);
  const [likedTopTracks, setLikedTopTracks] = useState([]);

  const fetchTopTracks = async () => {
    const tracks = await spotifyClient.getTodaysTopHits();
    setTopTracks(tracks.tracks);
    const likes = await tuneClient.areLikedTracks(tracks.tracks.map((t: any) => t.id));
    setLikedTopTracks(likes);
  }

  useEffect(() => {
    fetchTopTracks();
  }, []);

  return (
      <div className="d-flex container py-4">
        <div className="card-group">
          <ul className="list-group list-group-horizontal">
            {topTracks && likedTopTracks && topTracks.map((track: any, i: number) => (
                <li key={track.id} className="list-group-item border-0">
                  <TrackDisplay track={track} liked={likedTopTracks[i]}/>
                </li>
            ))}
          </ul>
        </div>
      </div>
  )
}