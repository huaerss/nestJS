import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './entities/login.entity';

import * as svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UpdateLoginDto } from './dto/update-login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login) private readonly lgoin: Repository<Login>,
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
    const data = await this.lgoin.find({
      where: {
        username: Like(`%${query.keywork}%`),
      },
      order: {
        id: 'DESC', // 降序 默认为asc
      },
      take: query.pageSize,
      skip: query.pageSize * (query.page - 1),
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
}
