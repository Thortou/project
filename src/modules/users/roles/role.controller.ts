import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { CreateRoleCommand } from "./commands/commands/create-role.command";
import { RoleEntity } from "../entities/role.entity";
import { Permissions } from "src/common/decorators/permission.decorator";
import { PermissionName } from "src/common/enum/permission-enum";
import { Public } from "src/common/decorators/public.decorator";
import { UpdateRoleDto } from "./dtos/update-role.dto";
import { UpdateRoleCommand } from "./commands/commands/update-role.command";
import { DeleteRoleCommand } from "./commands/commands/delete-role.command";
import { GetDetailRoleQuery } from "./queries/queries/get-detail-role.query";
import { QueryRoleDto } from "./dtos/query-role.dto";
import { GetPaginateRoleQuery } from "./queries/queries/get-paginated-role.query";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('roles')
export class RoleController {
    constructor(
        private readonly _commandBus: CommandBus,
        private _queryBus: QueryBus
    ) { }

    @Permissions(PermissionName.WRITE_ROLE)
    @Post()
    async create(@Body() input: CreateRoleDto): Promise<any> {
        return await this._commandBus.execute<CreateRoleCommand, RoleEntity>(new CreateRoleCommand(input))
    }

    @Permissions(PermissionName.UPDATE_ROLE)
    @Put(':id')
    async update(@Param('id') id: number, @Body() input: UpdateRoleDto): Promise<any> {
        return await this._commandBus.execute<UpdateRoleCommand, RoleEntity>(new UpdateRoleCommand(id, input))
    }
    @Permissions(PermissionName.DELETE_ROLE)
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this._commandBus.execute<DeleteRoleCommand, RoleEntity>(new DeleteRoleCommand(id))
    }
    @Permissions(PermissionName.READ_ROLE)
    @Get(':id')
    async getDetail(@Param('id') id: number): Promise<any> {
        return await this._queryBus.execute<GetDetailRoleQuery, RoleEntity>(new GetDetailRoleQuery(id))
    }
    @Permissions(PermissionName.READ_ROLE)
    @Get()
    async getPaginated(@Query() query: QueryRoleDto): Promise<any> {
        return await this._queryBus.execute<GetPaginateRoleQuery, RoleEntity>(new GetPaginateRoleQuery(query))
    }
}