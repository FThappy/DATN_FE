import { create } from 'zustand';

export const friendStore = create(set => ({
  totalFriend: 0,
  updateTotalFriend: (newTotalFriend: number) => set(() => ({ totalFriend: newTotalFriend })),
  deleteFriendZus: () => set((state: any) => ({ totalFriend: state.totalFriend - 1 }))
}));
