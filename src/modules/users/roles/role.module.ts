import { Module } from "@nestjs/common";
import { roleHandlers } from "./commands/handlers";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { PermissionService } from "../permissions/permission.service";
import { queryRoles } from "./queries/handlers";

@Module({
    controllers: [RoleController],
    providers: [
        ...roleHandlers,
        ...queryRoles,
        RoleService,
        PermissionService
    ]
})
export class RoleModules {}