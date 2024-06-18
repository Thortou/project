import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateRoleCommand } from "../commands/update-role.command";
import { RoleService } from "../../role.service";
import { NotFoundException } from "@nestjs/common";
import { PermissionService } from "src/modules/users/permissions/permission.service";

@CommandHandler(UpdateRoleCommand)
export class UpdeateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
    constructor(
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService
    ) { }
    async execute({ id, input }: UpdateRoleCommand): Promise<any> {
        const role = await this.roleService.findOne(id, 'id');
        const exist = await this.roleService.findOne(input.name, 'name');
        if (exist) {
            return { status: 500, message: `ບົດບາດ ${exist.name} ມີໃນລະບົບແລ້ວ` }
        }
        if (!role) throw new NotFoundException({ message: 'ບົດບາດນີ້ ບໍ່ມີ' })
        role.name = input.name
        role.description = input.description
        role.permissions = await this.permissionService.getPermissions(input.permission_ids);
        await this.roleService.update(role.id, role);
        return { status: 200, message: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ' }
    }
}