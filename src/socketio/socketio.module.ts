import { Module } from '@nestjs/common';
import { SocketIoGateway } from './socketio.gateway';

@Module({
  providers: [SocketIoGateway],
})
export class SocketIoModule {}
