import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set, get) => ({
      user:null,
      updateUser : (newUser:any) => set((state: any)=>(newUser)),
      deleteUser : () => set((state: any)=>({user:null}))
    }),
    {
      name: "user-storage", 
      storage: createJSONStorage(() => sessionStorage), 
    }
  )
);
