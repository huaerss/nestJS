import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { LoginService } from 'src/login/login.service';
import { LoginModule } from 'src/login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    LoginModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, // 替换为你自己的密钥
      signOptions: { expiresIn: '1h' }, // 设置 token 过期时间
    }),
  ],
})
export class AuthModule {}
