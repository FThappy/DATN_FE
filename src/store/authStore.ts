import { create } from "zustand";
import { UserRegister } from '@/utils/typeAuth';

export const authStore = create((set) => ({
  inforRegister: {},
  email : "",
  tokenRePassword : "",
  updateInforRegister: (newInforRegister:any) =>
    set(() => ({inforRegister : newInforRegister})),
  updateEmail : (newEmail:string) => set(() => ({email : newEmail})),
  updateRePassword : (newEmail: string, newTokenRePassword : string) => set(() => ({email : newEmail, tokenRePassword : newTokenRePassword})),
}));
