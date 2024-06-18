import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ChangePasswordUserDto {

    @ApiProperty({ required: false })
    @IsNumber()
    code: number;

    @ApiProperty({ required: false })
    @IsString()
    password: string;

    @ApiProperty({ required: false })
    @IsString()
    confirm_password: string
}