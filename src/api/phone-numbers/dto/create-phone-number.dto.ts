import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePhoneNumberDto {
    @IsNotEmpty()
    @IsString()
    owner_id: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string
}
