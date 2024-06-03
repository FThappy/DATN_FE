import axios from "axios";
import { io } from "socket.io-client";
import { cookies } from "next/headers";



export const userRequest = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_LINK_SERVER,
});


export const socket = io("http://localhost:5000", {
  withCredentials: true,
});

