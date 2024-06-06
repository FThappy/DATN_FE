import axios from "axios";
import { io } from "socket.io-client";



export const userRequest = axios.create({
  withCredentials: true,
  baseURL: "https://datn-be-3cll.onrender.com",
});


export const socket = io("https://datn-be-3cll.onrender.com", {
  withCredentials: true,
});
// export const socket = io("http://localhost:5000", {
//   withCredentials: true,
// });


