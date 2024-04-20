import {useEffect, useState} from "react";
import * as spotifyClient from "../Spotify/client";
import TrackCarousel from "../Tracks/TrackCarousel";

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
      <div className="flex container py-4">
        <TrackCarousel tracks={topTracks} />
      </div>
  )
}