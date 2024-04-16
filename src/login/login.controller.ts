import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  Session,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { Response, Request, query } from 'express';
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
  @Post('user')
  async created(@Body() createLoginDto: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.create(createLoginDto);
    console.log('data', data);
    res.send(data);
  }
  @Get('user')
  async finall(
    @Query() query: { keywork: string; page: number; pageSize: number },
    @Res() res: Response,
  ) {
    console.log(query);
    const data = await this.loginService.findAll(query);
    res.send(data);
  }
  @Put('user')
  async update(@Body() updateLoginDto: UpdateLoginDto, @Res() res: Response) {
    const data = await this.loginService.update(updateLoginDto);
    res.send(data);
  }
  @Delete('user')
  async remove(@Query('id') id: number, @Res() res: Response) {
    const data = await this.loginService.remove(id);
    res.send(data);
  }
}
