import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(
    "http://localhost:4000/api/users",
    user
  );
  return response.data;
};
export const getUsers = async () => {
  const response = await axiosWithCredentials.get(
    "http://localhost:4000/api/users"
  );
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `http://localhost:4000/api/users/${user._id}`,
    user
  );
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axiosWithCredentials.delete(
    `http://localhost:4000/api/users/${id}`
  );
  return response.data;
};

export const registerUser = async (user: any) => {
  const response = await axiosWithCredentials.post(
    "http://localhost:4000/api/users/register",
    user
  );
  return response.data;
};

export const loginUser = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    "http://localhost:4000/api/users/login",
    credentials
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(
    "http://localhost:4000/api/users/profile"
  );
  return response.data;
};

export const logout = async () => {
  const response = await axiosWithCredentials.post(
    "http://localhost:4000/api/users/logout"
  );
  return response.data;
};
