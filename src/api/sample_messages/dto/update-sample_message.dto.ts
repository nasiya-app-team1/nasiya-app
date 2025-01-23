import { PartialType } from '@nestjs/swagger';
import { CreateSampleMessageDto } from './create-sample_message.dto';

export class UpdateSampleMessageDto extends PartialType(
  CreateSampleMessageDto,
) {
  sample?: string;
}
