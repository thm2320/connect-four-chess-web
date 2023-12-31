'use client';

import { Button } from '@mantine/core';
import { GameBoard } from './GameBoard';
import { SocketContext } from '@/app/SocketProvider';
import { useContext } from 'react';
import { CustomRoomEvent } from '@/socket/SocketEvent';
import { useParams, useRouter } from 'next/navigation';

export default function GameRoom() {
  const socket = useContext(SocketContext);
  const router = useRouter();
  const { roomName } = useParams();

  const leaveRoomHandler = () => {
    if (socket && socket.connected) {
      socket.emit(CustomRoomEvent.LeaveRoom, { roomName }, () => {
        router.back();
      });
    }
  };

  return (
    <>
      <GameBoard />
      <Button onClick={leaveRoomHandler}>Leave</Button>
    </>
  );
}
