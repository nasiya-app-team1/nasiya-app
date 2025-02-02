import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateSampleMessageDto {
  @ApiProperty({
    description: 'Example messsage',
    example: 'just test',
  })
  @IsString()
  @MinLength(5)
  sample: string;
}
