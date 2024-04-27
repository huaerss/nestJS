import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
  ) {}
  async signin(info: { username: string; password: string }) {
    const {
      data: [user],
    } = await this.loginService.findAll({ keywork: info.username });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('账号或密码错误');
    }
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
