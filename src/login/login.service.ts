import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class LoginService {
  getCaptcha() {
    const data = svgCaptcha.create({
      size: 4,
      noise: 2,
      color: true,
      background: '#cc9966',
    });
    return data;
  }
}
