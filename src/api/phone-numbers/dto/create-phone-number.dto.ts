import { IsNotEmpty } from 'class-validator';

export class CreatePhoneNumberDto {
  @IsNotEmpty()
  phone_nuber: string;

  @IsNotEmpty()
  debtor_id: string;
}
