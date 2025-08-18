export type InputUserRegister = {
  username: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  address: string;
  type: string;
  birth: Date | null;
};
export type UserRegister = {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  type: string;
  birth: Date;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  birth: Date;
  phone: string;
  type: string;
  address: string;
  isAdmin: false;
  isLock: false;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  img: string;
  wall: string;
  displayname: string;
};
export type UserPublic = {
  _id: string;
  username: string;
  displayname: string;
  img: string;
};
