import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { LoginController } from 'src/login/login.controller';

@Module({
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
