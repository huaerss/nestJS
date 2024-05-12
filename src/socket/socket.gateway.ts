import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';
import { playerData } from './socket.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly SocketService: SocketService) {}

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    //  将消息发送给所有连接的客户端
    this.server.emit('events', data);
    return data;
  }
  @SubscribeMessage('move')
  handleMove(@MessageBody() data: playerData): playerData {
    console.log('触发了move');
    this.SocketService.setMoveData(data);

    this.server.emit('Msgmove', data);
    return data;
  }
}
