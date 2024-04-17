import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './entities/login.entity';
import { Info } from './entities/info.entity';

import * as svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UpdateLoginDto } from './dto/update-login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login) private readonly lgoin: Repository<Login>,
    @InjectRepository(Info) private readonly info: Repository<Info>,
  ) {}
  getCaptcha() {
    const data = svgCaptcha.create({
      size: 4,
      noise: 2,
      color: true,
      background: '#cc9966',
    });
    return data;
  }

  create(createLoginDto: CreateLoginDto) {
    const data = new Login();
    data.username = createLoginDto.username;
    data.password = createLoginDto.password;
    return this.lgoin.save(data);
  }
  async findAll(query: { keywork: string; page: number; pageSize: number }) {
    console.log(query);
    const data = await this.lgoin.find({
      // 如果keywork有值就查询 否则查询全部
      where: {
        username: Like(`%${query.keywork ?? ''}%`),
      },
      relations: ['info'],
      order: {
        id: 'DESC', // 降序 默认为asc
      },
      take: query.pageSize || 10,
      skip: query.pageSize * (query.page - 1) || 0,
    });
    const total = await this.lgoin.count({
      where: {
        username: Like(`%${query.keywork}%`),
      },
    });
    return {
      data,
      total,
    };
  }
  remove(id: number) {
    return this.lgoin.delete(id);
  }
  update(updateLoginDto: UpdateLoginDto) {
    return this.lgoin.update(updateLoginDto.id, updateLoginDto);
  }
  async addmsg(infoDto: { text: string; loginId: number }) {
    const login = await this.lgoin.findOne({
      where: { id: infoDto.loginId },
    });
    const data = new Info();
    data.text = infoDto.text;
    data.Login = login;
    return this.info.save(data);
  }

  async finmsg(id: number) {
    const data = await this.info.find({
      where: {
        loginId: id,
      },
    });
    return data;
  }
}
