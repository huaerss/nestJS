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
import { Response, Request } from 'express';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { checkDTo } from './dto/check-login.dto';

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
    res.send('ok');
  }

  @Post('user')
  async created(@Body() createLoginDto: CreateLoginDto, @Res() res: Response) {
    const data = await this.loginService.create(createLoginDto);
    res.send(data);
  }
  @Get('user')
  async finall(
    @Query() query: { keywork: string; page: number; pageSize: number },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    console.log(req.user);
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
  @Post('msg')
  async msg(@Body() infoDto, @Res() res: Response) {
    this.loginService.addmsg(infoDto);
    res.send('ok');
  }
  @Get('msg')
  async getmsg(@Query() loginId: checkDTo, @Res() res: Response) {
    const data = await this.loginService.finmsg(loginId.id);
    res.send(data);
  }
}
