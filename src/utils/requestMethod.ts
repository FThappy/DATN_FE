import axios from 'axios';
import { io } from 'socket.io-client';

export const userRequest = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_LINK_SERVER
});

export const socket = io(process.env.NEXT_PUBLIC_LINK_SERVER as string, {
  withCredentials: true
});
