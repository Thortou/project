import { Module } from "@nestjs/common";
import { GetPaginatedPermissionHandler } from "./queries/handlers/get-paginated.permission.handler";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./permission.controller";

@Module({
    controllers: [PermissionController],
    providers: [GetPaginatedPermissionHandler, PermissionService]
})
export class PermissionModule {}