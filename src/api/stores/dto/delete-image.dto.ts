import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteStoreImageDto {
  @ApiProperty({
    description: 'Path of image',
    example: '/static/store/697f43ce-bb35-4ccb-bc60-a2f22a7a1ba3.png',
  })
  @IsString()
  @IsNotEmpty()
  path: string;
}
