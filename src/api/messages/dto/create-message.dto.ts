import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MessageStatus } from 'src/common/index.common';

export class CreateMessageDto {
  @ApiProperty({
    description: 'debtor_id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsNotEmpty()
  debtor_id: string;

  @ApiProperty({
    description: 'Message for note',
    example: 'is is just simple message for swagger',
  })
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'status of message',
    example: 'pending',
  })
  @IsNotEmpty()
  status: MessageStatus;

  @ApiProperty({
    description: 'Simple message id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsNotEmpty()
  sample_message_id: string;
}
