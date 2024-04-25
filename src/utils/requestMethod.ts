import axios from "axios";

export const userRequest = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_LINK_SERVER,
});
