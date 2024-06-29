import { UserPublic } from "./typeAuth";

export type MessageProp = {
  _id: string;
  from: string;
  to: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  isRead: string[];
  img: string[];
  filePath: string;
};
export type Room = {
  _id: string;
  listUser: string[];
  type: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type CardRoom = {
  room : Room;
  lastMess: MessageProp | undefined;
  user : UserPublic
};