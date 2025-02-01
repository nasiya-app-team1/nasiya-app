import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSampleMessageDto } from './create-sample_message.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

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
}
