import { Controller, Get, Post, Body, Req, Res, Session } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Get('captcha')
  getCaptcha(@Req() req: Request, @Res() res: Response, @Session() session) {
    const captcha = this.loginService.getCaptcha();
    session.code = captcha.text;

    res.type('svg');
    res.send(captcha.data);
  }
  @Post('verify')
  verify(@Session() session, @Body() body, @Res() res: Response) {
    console.log(body.captcha);
    console.log(session.code);
    res.send('ok');
  }
}
