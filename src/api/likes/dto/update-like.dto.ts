import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLikeDto{
    @ApiProperty({
        description: 'Store id',
        example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
      })
      @IsOptional()
      @IsString()
      store_id?: string;
    
      @ApiProperty({
        description: 'Debtor id',
        example: 'e2f48432-0de3-4a0f-b1f6-42bbace74a14',
      })
      @IsOptional()
      @IsString()
      debtor_id?: string;
}
