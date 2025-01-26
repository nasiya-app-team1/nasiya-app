import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSampleMessageDto } from './create-sample_message.dto';
import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class UpdateSampleMessageDto extends PartialType(
  CreateSampleMessageDto,
) {
  @ApiProperty({
    description: 'Example messsage',
    example: 'just test',
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  sample?: string;

  @ApiProperty({
    description: 'Relation store id',
    example: 'ca7664cc-99b3-4201-918a-92955a7db171',
  })
  @IsUUID()
  @IsOptional()
  store_id?: string;
}
