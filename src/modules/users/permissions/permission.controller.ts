import { Controller, Get, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { QueryPermissionDto } from "./dtos/query-permission.dto";
import { GetPaginatedPermissionQuery } from "./queries/queries/get-paginated.permission.query";
import { Permissions } from "src/common/decorators/permission.decorator";
import { PermissionName } from "src/common/enum/permission-enum";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('permissions')
export class PermissionController {
    constructor(
        private _queryBUs: QueryBus,
    ) { }

    @Get()
    @Permissions(PermissionName.READ_PERMISSION)
    async getPaginated(@Query() query: QueryPermissionDto): Promise<any> {
        return await this._queryBUs.execute<GetPaginatedPermissionQuery>(new GetPaginatedPermissionQuery(query))
    }
}