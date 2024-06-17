import { IsNumber, IsString } from "class-validator";

export class ChangePasswordUserDto {
    @IsNumber()
    code: number;
    @IsString()
    password: string;
    @IsString()
    confirm_password: string
}