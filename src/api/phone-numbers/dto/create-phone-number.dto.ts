import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhoneNumberDto {
  @ApiProperty({
    description: 'owner uuid for phone',
    example: 'kdfjak-djlqef-fkjaf',
  })
  @IsNotEmpty()
  @IsString()
  owner_id: string;

  @ApiProperty({
    description: 'phone_number',
    example: '+998901234567',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;
}
