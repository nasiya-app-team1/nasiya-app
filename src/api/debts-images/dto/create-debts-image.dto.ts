import { IsNotEmpty } from 'class-validator';

export class CreateDebtsImageDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  debts_id: string;
}
