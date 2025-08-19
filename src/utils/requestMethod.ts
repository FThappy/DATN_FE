import axios from 'axios';
import { io } from 'socket.io-client';

export const userRequest = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_LINK_SERVER
});

export const socket = io('https://datn-be-zrcv.onrender.com', {
  withCredentials: true
});
