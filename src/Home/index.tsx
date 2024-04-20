import {useEffect, useState} from "react";
import * as spotifyClient from "../Spotify/client";
import * as tuneClient from "../Tune/client";
import TrackCarousel from "../Tracks/TrackCarousel";

export default function Home() {
  const [tracks, setTracks] = useState<any>([]);
  const [color, setColor] = useState('danger');

  const fetchTopTracks = async () => {
    const tracks = await spotifyClient.getTodaysTopHits();
    setTracks(tracks.tracks);
    setColor('danger')
  }

  const fetchWeeklyNewReleases = async () => {
    const tracks = await spotifyClient.getWeeklyNewReleases();
    setTracks(tracks.tracks);
    setColor('primary');
  }

  const fetchLikedTracksPlaylist = async () => {
    const tracks = await tuneClient.getLikedPlaylist();
    setTracks(tracks.tracks);
    setColor('warning');
  }

  useEffect(() => {
    fetchTopTracks();
  }, []);

  return (
      <div className="flex container py-4">
        <TrackCarousel tracks={tracks} color={color}/>
        <div className="d-flex mt-4">
          <button className="btn btn-danger flex-grow-1"
                  onClick={fetchTopTracks}>Hot Tracks
          </button>
          <button className="btn btn-primary flex-grow-1 mx-5"
                  onClick={fetchWeeklyNewReleases}>New Releases
          </button>
          <button className="btn btn-warning flex-grow-1"
                  onClick={fetchLikedTracksPlaylist}>Liked Tracks
          </button>
        </div>
      </div>
  )
}