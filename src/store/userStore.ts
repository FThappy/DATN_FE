import { UserPublic } from '@/utils/typeAuth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
  persist(
    (set, get) => ({
      user: null,
      updateUser: (newUser: any) => set((state: any) => newUser),
      updateUserAuth: (newUser: UserPublic) =>
        set((state: any) => ({
          user: newUser
        })),
      updateImage: (newImage: string) =>
        set((state: any) => ({
          user: {
            ...state.user,
            img: newImage
          }
        })),
      updateUsername: (newUsername: string) =>
        set((state: any) => ({
          user: {
            ...state.user,
            username: newUsername
          }
        })),
      updateDisplayName: (newDisplayName: string) =>
        set((state: any) => ({
          user: {
            ...state.user,
            displayName: newDisplayName
          }
        })),
      deleteUser: () => set((state: any) => ({ user: null }))
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
