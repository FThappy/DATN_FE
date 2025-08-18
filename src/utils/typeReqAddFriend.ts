export type ReqAddFriendProps = {
  _id: string;
  from: string;
  to: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type FriendProps = {
  _id: string;
  friend: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
