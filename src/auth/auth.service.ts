import { Injectable } from '@nestjs/common';
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
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
