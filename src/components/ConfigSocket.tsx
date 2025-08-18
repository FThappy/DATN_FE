'use client';
import { socket } from '@/utils/requestMethod';
import React, { useEffect } from 'react';

type Props = {};

const ConfigSocket = (props: Props) => {
  useEffect(() => {
    socket.emit('first-connect');
  }, []);
  return <></>;
};

export default ConfigSocket;
