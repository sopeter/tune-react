import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});
const NODE_API = process.env.REACT_APP_BASE_API;

export const getTodaysTopHits = async () => {
  const response = await axiosWithCredentials.get(
      `${NODE_API}/api/spotify/todays-top-hits`
  );

  return response.data;
}

export const searchTracks = async (query: String) => {
  const response = await axiosWithCredentials.get(
      `${NODE_API}/api/spotify/search/tracks/${query}`
  );

  return response.data;
}

export const getTrack = async (trackId: any) => {
  const response = await axiosWithCredentials.get(
      `${NODE_API}/api/spotify/tracks/${trackId}`
  );

  return response.data;
}