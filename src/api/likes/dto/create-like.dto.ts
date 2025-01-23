import { IsOptional, IsString } from "class-validator";

export class CreateLikeDto {
    @IsOptional()
    @IsString()
    store_id: string;
  
    @IsOptional()
    @IsString()
    debtor_id: string;
}