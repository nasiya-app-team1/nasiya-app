import {
    IsString,
    MinLength
  } from 'class-validator';
  
export class CreateSampleMessageDto {
    @IsString()
    @MinLength(5)
    sample:string
}
