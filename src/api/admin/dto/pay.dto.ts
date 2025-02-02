import { IsNotEmpty, IsUUID } from 'class-validator';

export class PayDto {
  @IsNotEmpty()
  sum: number;

  @IsUUID()
  @IsNotEmpty()
  store_id: string;
}
