import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { Info } from './entities/info.entity';
import { SocketService } from 'src/socket/socket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Login, Info])],
  controllers: [LoginController],
  providers: [LoginService, SocketService],
  exports: [LoginService], // 导出 LoginService
})
export class LoginModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('login');
  }
}
