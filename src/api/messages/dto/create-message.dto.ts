import { IsNotEmpty, IsString, IsOptional, isString } from 'class-validator';

export class CreateMessageDto {
  // @IsNotEmpty()
  @IsString()
  store_id: string;

  // @IsNotEmpty()
  @IsString()
  debtor_id: string;

  // @IsNotEmpty
  @IsString()
  message: string;

  @IsString()
  status: string;

  // @IsOptional()
  @IsString()
  sample_message_id?: string;
}
