import { CardRoom } from '@/utils/typeMess';
import { create } from 'zustand';

export interface BoxChat {
  idBox: string;
  type: string;
  roomMsg: CardRoom | undefined;
}

export interface State {
  listBoxChat: BoxChat[];
  activeBoxChat: string;
  updateBoxChat: (idBox: string, type: string, roomMsg: CardRoom | undefined) => void;
  deleteBoxChat: (index: string) => void;
}

export const boxChatStore = create<State>(set => ({
  listBoxChat: [],
  activeBoxChat: '',
  updateBoxChat: (idBox: string, type: string, roomMsg: CardRoom | undefined) =>
    set(state => {
      const existingBox = state.listBoxChat.find(box => box.idBox === idBox && box.type === type);

      if (existingBox) {
        return { listBoxChat: [...state.listBoxChat] };
      }
      if (type === 'person') {
        const exitsBox = state.listBoxChat.find(box => box.roomMsg?.user._id === idBox);
        if (exitsBox) {
          return { listBoxChat: [...state.listBoxChat] };
        }
      }
      if (type !== 'person') {
        const exitsBox = state.listBoxChat.find(box => box.idBox === roomMsg?.user._id);
        if (exitsBox) {
          return { listBoxChat: [...state.listBoxChat] };
        }
      }
      if (state.listBoxChat.length === 3) {
        return {
          listBoxChat: [...state.listBoxChat.slice(1, 3), { idBox: idBox, type: type, roomMsg: roomMsg }]
        };
      }
      return {
        listBoxChat: [...state.listBoxChat, { idBox: idBox, type: type, roomMsg: roomMsg }]
      };
    }),
  deleteBoxChat: (idBox: string) =>
    set(state => {
      return {
        listBoxChat: state.listBoxChat.filter(box => box.idBox !== idBox)
      };
    }),
  deleteAll: () =>
    set(state => {
      return {
        listBoxChat: []
      };
    })
}));
