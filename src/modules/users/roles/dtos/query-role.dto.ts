import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { RoleEntity } from "src/modules/users/entities/role.entity";

export class QueryRoleDto extends PaginationDto<RoleEntity> {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString({ message: ('validation.IS_STRING') })
    name?: string;
  }