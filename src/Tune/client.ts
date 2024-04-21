import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});
const NODE_API = process.env.REACT_APP_BASE_API;

// Tracks
const TRACKS_API = `${NODE_API}/api/tracks`;

export const createTrack = async (track: any) => {
  const response = await axiosWithCredentials.post(
      TRACKS_API,
      track
  );

  return response.data;
};

export const deleteTrack = async (trackId: any) => {
  const response = await axiosWithCredentials.delete(
      `${TRACKS_API}/${trackId}`,
  );

  return response.data;
};

export const updateTrack = async (trackId: any) => {
  const response = await axiosWithCredentials.put(
      `${TRACKS_API}/${trackId}`,
  );

  return response.data;
};

export const getAllTracks = async () => {
  const response = await axiosWithCredentials.get(
      TRACKS_API,
  );

  return response.data;
};

export const getTrackById = async (trackId: any) => {
  const response = await axiosWithCredentials.get(
      `${TRACKS_API}/${trackId}`
  );

  return response.data;
};

export const getTrackBySpotifyId = async(trackId: any) => {
  const response = await axiosWithCredentials.get(
      `${TRACKS_API}/spotify/${trackId}`
  );

  return response.data;
}

// Likes
const LIKES_API = `${NODE_API}/api/likes`;

export const likeTrack = async (track: any) => {
  const response = await axiosWithCredentials.post(
      `${LIKES_API}/track`,
      track
  );

  return response.data
};

export const unlikeTrack = async (trackId: any) => {
  const response = await axiosWithCredentials.delete(
      `${LIKES_API}/track/${trackId}`
  );

  return response.data
};

export const getAllLikedTracks = async () => {
  const response = await axiosWithCredentials.get(
      `${LIKES_API}/track`
  );

  return response.data
};

export const areLikedTracks = async (trackIds: any[]) => {
  const response = await axiosWithCredentials.post(
      `${LIKES_API}/track/compare`,
      trackIds
  );

  return response.data;
}

export const getLikedPlaylist = async () => {
  try {
    const response = await axiosWithCredentials.get(
        `${LIKES_API}/likePlaylist`
    );
    return response.data;
  } catch (e) {
    console.error(`Could not get Liked Playlist: ${e}`);
    throw new Error("Error getting playlist of liked songs");
  }
}

// Social
const SOCIAL_API = `${NODE_API}/api/social`;

export const followUser = async (userId: any) => {
  const response = await axiosWithCredentials.post(
      `${SOCIAL_API}/follow/${userId}`
  );

  return response.data;
}

export const unfollowUser = async (userId: any) => {
  const response = await axiosWithCredentials.delete(
      `${SOCIAL_API}/follow/${userId}`
  );

  return response.data;
}

export const getAllFollowing = async (userId: any) => {
  const response = await axiosWithCredentials.get(
      `${SOCIAL_API}/following/${userId}`
  );

  return response.data;
}

export const getAllFollowers = async (userId: any) => {
  const response = await axiosWithCredentials.get(
      `${SOCIAL_API}/followers/${userId}`
  );

  return response.data;
}