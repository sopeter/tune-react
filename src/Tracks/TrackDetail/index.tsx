import TrackDisplay from "../TrackDisplay";
import {useEffect, useState} from "react";
import * as spotifyClient from "../../Spotify/client";
import {useParams} from "react-router-dom";

export default function TrackDetail() {
  const [track, setTrack] = useState(null);
  const {trackId} = useParams();

  const fetchTrack = async () => {
    const track = await spotifyClient.getTrack(trackId);
    setTrack(track);
  };

  useEffect(() => {
    fetchTrack();
  }, []);

  return (
      <div className="d-flex container py-4">
        {track && <TrackDisplay track={track}/>}
      </div>
  );
}