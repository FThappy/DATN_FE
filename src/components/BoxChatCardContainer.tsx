import { checkRoom } from '@/actions/checkRoom';
import { getUserPublic } from '@/actions/getInfoUserPublic';
import { socket } from '@/utils/requestMethod';
import toastifyUtils from '@/utils/toastify';
import { UserPublic } from '@/utils/typeAuth';
import { CardRoom, MessageProp, Room } from '@/utils/typeMess';
import React, { useEffect, useState } from 'react';
import BoxChatCard from './BoxChatCard';
import { Skeleton } from './ui/skeleton';
import { getMessageForRoom } from '@/actions/getMessageForRoom';

type Props = {
  roomId: string;
  index: number;
  type: string;
  roomMsg: CardRoom | undefined;
};

const BoxChatCardContainer = (props: Props) => {
  const { roomId, index, type, roomMsg } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [room, setRoom] = useState<Room>();

  const [listMessage, setListMessage] = useState<MessageProp[]>([]);

  const [end, setEnd] = useState<boolean>(true);

  const [user, setUser] = useState<UserPublic>();

  useEffect(() => {
    const getRoom = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await checkRoom(roomId);
        if (res.code === 0) {
          setIsLoading(false);
          setListMessage(res.listMessage);
          setRoom(res.messageRoom);
          socket.emit('join-messageRoom', res.messageRoom._id);
        } else {
          setIsLoading(false);
          setListMessage([]);
          setRoom(undefined);
          setEnd(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toastifyUtils('error', 'Lỗi server');
      }
    };
    if (type === 'person') {
      getRoom();
    }
  }, [roomId, type]);
  useEffect(() => {
    const getMess = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await getMessageForRoom(roomId, 0);
        if (res.code === 0) {
          setIsLoading(false);
          socket.emit('join-messageRoom', roomId);
          setListMessage(res.data);
          setUser(roomMsg?.user);
        } else {
          setIsLoading(false);
          setListMessage([]);
          setRoom(undefined);
          setEnd(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toastifyUtils('error', 'Lỗi server');
      }
    };
    if (type === 'single') {
      getMess();
    }
  }, [roomId, type]);

  useEffect(() => {
    const getUserJoin = async (): Promise<void> => {
      try {
        const res = await getUserPublic(roomId);
        if (res.code === 3) {
          toastifyUtils('error', 'Không tồn tại người dùng');
        }
        setUser(res.data);
      } catch (error) {
        console.log(error);
        toastifyUtils('error', 'Lỗi server');
      }
    };
    if (type === 'person') {
      getUserJoin();
    }
  }, [roomId, type]);
  return user ? (
    <BoxChatCard
      roomId={roomId}
      index={index}
      type={type}
      listMessage={listMessage}
      setListMessage={setListMessage}
      room={type !== 'person' ? roomMsg?.room : room}
      setRoom={setRoom}
      end={end}
      setEnd={setEnd}
      user={type !== 'person' ? roomMsg?.user : user}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  ) : (
    <Skeleton className='h-full w-full rounded-[8px]' />
  );
};

export default BoxChatCardContainer;
