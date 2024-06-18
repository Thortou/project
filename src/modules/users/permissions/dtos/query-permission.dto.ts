import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PermissionEntity } from "../../entities/permission.entity";
import { PermissionDisplayName } from "src/common/enum/permission-enum";

export class QueryPermissionDto extends PaginationDto<PermissionEntity> {
    // @ApiProperty({ required: false })
    @IsOptional()
    @IsString({ message: ('validation.IS_STRING') })
    name?: PermissionDisplayName;

    // @ApiProperty({ required: false })
    @IsOptional()
    @IsString({ message: ('validation.IS_STRING') })
    display_name?: string;
}