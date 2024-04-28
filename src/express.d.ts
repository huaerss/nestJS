import { Request } from 'src/express';

declare module 'express' {
  export interface Request {
    user?: any; // 根据你的用户对象类型，这里可以是更具体的类型
  }
}
