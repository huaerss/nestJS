import { Column, Entity, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Login } from './login.entity';
@Entity()
export class Info {
  @PrimaryGeneratedColumn() // 主键
  id: number;
  @Column() // 字段
  text: string;
  @Column({ name: 'login_id' })
  @IsNotEmpty()
  loginId: number;
  @JoinColumn({ name: 'login_id' })
  Login: Login;
}
