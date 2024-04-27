import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginDto } from './create-login.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateLoginDto extends PartialType(CreateLoginDto) {
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  password: string;
}
