import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Login } from './login.entity';
@Entity()
export class Info {
  @PrimaryGeneratedColumn() // 主键
  id: number;
  @Column() // 字段
  text: string;
  @ManyToOne(() => Login, (login) => login.info)
  Login: Login;
}
