import { IsNumber, IsOptional } from 'class-validator';

export class Pagination {
  @IsNumber()
  @IsOptional()
  skip: number;

  @IsNumber()
  @IsOptional()
  limit: number;
}
