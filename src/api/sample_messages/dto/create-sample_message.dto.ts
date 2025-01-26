import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateSampleMessageDto {
  @ApiProperty({
    description: 'Example messsage',
    example: 'just test',
  })
  @IsString()
  @MinLength(5)
  sample: string;

  @ApiProperty({
    description: 'Relation store id',
    example: 'ca7664cc-99b3-4201-918a-92955a7db171',
  })
  @IsUUID()
  store_id: string;
}
