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
  birth: Date ;
};
