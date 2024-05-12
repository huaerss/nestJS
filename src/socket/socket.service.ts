import { Injectable } from '@nestjs/common';
import { playerData } from './socket.interface';
@Injectable()
export class SocketService {
  private palerDatas: playerData = {} as playerData;

  setMoveData(data: playerData) {
    this.palerDatas = data;
    // 插入到数据库
  }
  getMoveData() {
    console.log(this.palerDatas);
    return this.palerDatas;
  }
}
