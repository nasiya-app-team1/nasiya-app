import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { MessageStatus } from "src/common/enum";

export class UpdateMessageDto  {

  @ApiProperty({
    description: 'store id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsOptional()
  store_id?: string;

  @ApiProperty({
    description: 'Debtor id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsOptional()
  debtor_id?: string;

  @ApiProperty({
    description: 'Message for note',
    example: 'is is just simple message for swagger',
  })
  @IsOptional()
  message?: string;

  @ApiProperty({
    description: 'status of message',
    example: 'pending',
  })
  @IsOptional()
  status?: MessageStatus;

  @ApiProperty({
    description: 'Simple message id',
    example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
  })
  @IsOptional()
  sample_message_id?: string;
}
