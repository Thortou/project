import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";


export enum bodyEnum {
    MALE='male',
    FEMALE='female'
}
export class BodyDto {
    @ApiProperty({ required: false, enum: bodyEnum, description: 'bodyEnum' })
    @IsEnum(bodyEnum, {message:`ຕ້ອງເປັນ : ${Object.values(bodyEnum).join(',')}`})
    Gender: bodyEnum
}