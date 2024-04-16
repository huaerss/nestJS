import { Info } from './info.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Login {
  @PrimaryGeneratedColumn() // 主键
  id: number;
  @Column() // 字段
  username: string;
  @Column() // 字段
  password: string;
  @CreateDateColumn({ type: 'timestamp', comment: '创建时间' }) // 创建时间
  createTime: Date;
  @OneToMany(() => Info, (info) => info.Login)
  info: Info;
}
