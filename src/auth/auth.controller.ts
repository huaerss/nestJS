import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, Post, HttpCode, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  @HttpCode(200)
  sigin(@Body() info: { username: string; password: string }) {
    return this.authService.signin(info);
  }
  @UseGuards(AuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
