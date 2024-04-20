import TrackDisplay from "../TrackDisplay";
import {useEffect, useState} from "react";
import * as spotifyClient from "../../Spotify/client";
import * as tuneClient from "../../Tune/client";
import {useParams} from "react-router-dom";

export default function TrackDetail() {
  const [track, setTrack] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const {trackId} = useParams();

  const fetchTrack = async () => {
    const track = await spotifyClient.getTrack(trackId);
    setTrack(track);
    const liked = await tuneClient.areLikedTracks([track.id])
    setIsLiked(liked[0]);
  };

  useEffect(() => {
    fetchTrack();
  }, []);

  return (
      <div className="d-flex container py-4">
        {track && <TrackDisplay track={track} liked={isLiked}/>}
        {track && <div className="px-4 col-6">
          <iframe src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                  title={track.id}
                  width="100%" height="152" frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"></iframe>
        </div>}
      </div>
  );
}