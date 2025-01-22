import { IsNotEmpty } from 'class-validator';

export class CreateDebtorImageDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  debtor_id: string;
}
