import {useEffect, useState} from "react";
import * as spotifyClient from "../Spotify/client";
import * as tuneClient from "../Tune/client";
import TrackCarousel from "../Tracks/TrackCarousel";
import {useSelector} from "react-redux";
import {UserState} from "../Store";

export default function Home() {
  const [tracks, setTracks] = useState<any>([]);
  const [color, setColor] = useState('danger');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: UserState) => state.userReducer.user);

  const fetchTopTracks = async () => {
    setLoading(true);
    const tracks = await spotifyClient.getTodaysTopHits();
    setTracks(tracks.tracks);
    setColor('danger')
    setLoading(false);
  }

  const fetchWeeklyNewReleases = async () => {
    setLoading(true);
    const tracks = await spotifyClient.getWeeklyNewReleases();
    setTracks(tracks.tracks);
    setColor('primary');
    setLoading(false);
  }

  const fetchLikedTracksPlaylist = async () => {
    if (user && user._id !== null) {
      setLoading(true);
      const tracks = await tuneClient.getLikedPlaylist();
      setTracks(tracks.tracks);
      setColor('warning');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopTracks();
  }, []);

  return (
      <div className="flex container py-4">
        {loading && (
            <div className="text-center my-4">
              <div className="spinner-border" role="status"></div>
            </div>
        )}
        {!loading && <TrackCarousel tracks={tracks} color={color}/>}
        <div className="d-flex mt-4 justify-content-center">
          <button className="btn btn-danger flex-grow-1 mx-3"
                  onClick={fetchTopTracks}>Hot Tracks
          </button>
          <button className="btn btn-primary flex-grow-1 mx-3"
                  onClick={fetchWeeklyNewReleases}>New Releases
          </button>
          {user && user._id && (
              <button className="btn btn-warning flex-grow-1 mx-3"
                      onClick={fetchLikedTracksPlaylist}>Liked Tracks
              </button>
          )}
        </div>
      </div>
  )
}