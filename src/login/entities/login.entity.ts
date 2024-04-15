import {
  Column,
  CreateDateColumn,
  Entity,
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
}
