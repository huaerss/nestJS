import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Login } from './login.entity';
@Entity()
export class Info {
  @PrimaryGeneratedColumn() // 主键
  id: number;
  @Column() // 字段
  text: string;
  @Column({ name: 'login_id' })
  @IsNotEmpty()
  @IsNumber()
  loginId: number;
  @OneToMany(() => Login, (login) => login.info)
  @JoinColumn({ name: 'login_id' })
  Login: Login;
}
