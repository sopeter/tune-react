import {useEffect, useState} from "react";
import * as spotifyClient from "../Spotify/client";
import TrackDisplay from "../Tracks/TrackDisplay";
import "./index.css";

export default function Home() {

  const [topTracks, setTopTracks] = useState<any>([]);

  const fetchTopTracks = async () => {
    const tracks = await spotifyClient.getTodaysTopHits();
    setTopTracks(tracks.tracks);
  }

  useEffect(() => {
    fetchTopTracks();
  }, []);

  return (
      <div className="d-flex container py-4">
        <div className="card-group">
          <ul className="list-group list-group-horizontal">
            {topTracks && topTracks.map((track: any) => (
                <li key={track.id} className="list-group-item border-0">
                  <TrackDisplay track={track} />
                </li>
            ))}
          </ul>
        </div>
      </div>
  )
}