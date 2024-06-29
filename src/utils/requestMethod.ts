import axios from "axios";
import { io } from "socket.io-client";



export const userRequest = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_LINK_SERVER,
});


export const socket = io("http://localhost:5000", {
  withCredentials: true,
});




// export const userRequest = axios.create({
//   withCredentials: true,
//   baseURL: "https://datn-be-zrcv.onrender.com",
// });

// export const socket = io("https://datn-be-zrcv.onrender.com", {
//   withCredentials: true,
// });