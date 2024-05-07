import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from 'src/auth/auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket, ...args: any[]) {
    // 访问握手请求中的请求头
    const headers = client.handshake;
    // 进行你所需的操作，例如打印请求头
  }
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    //  将消息发送给所有连接的客户端
    this.server.emit('events', data);
    return data;
  }
}
