import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginModule } from 'src/login/login.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [LoginModule],
})
export class AuthModule {}
