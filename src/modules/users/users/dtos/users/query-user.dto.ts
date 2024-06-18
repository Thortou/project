import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { UserEntity } from "src/modules/users/entities/user.entity";

export class QueryUserDto extends PaginationDto<UserEntity> {
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString({ message:('validation.IS_STRING') })
    username?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString({ message:('validation.IS_STRING') })
    phone?: string;
  
    // @ApiProperty({ required: false })
    // @IsOptional()
    // @Transform(({ value }) => {
    //   if (value === 'true') return true;
    //   if (value === 'false') return false;
    //   return value;
    // })
    // @IsBoolean({ message: i18nValidationMessage('validation.IS_BOOLEAN') })
    // is_customer?: boolean;
  }