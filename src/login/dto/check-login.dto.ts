import { IsNotEmpty, IsNumber } from 'class-validator';

export class checkDTo {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
