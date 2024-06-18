import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRoleDto {
    
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: ('validation.IS_NOT_EMPTY') })
  @IsString({ message: ('validation.IS_STRING') })
  @MaxLength(100, { message: ('validation.MAX_LENGTH') })
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: ('validation.IS_STRING') })
  description?: string;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray({ message: ('validation.IS_ARRAY') })
  @IsNumber(
    {},
    { each: true, message: ('validation.IS_NUMBER_EACH') },
  )
  permission_ids: number[];
}