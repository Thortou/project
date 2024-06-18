import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateRoleCommand } from "../commands/create-role.command";
import { RoleService } from "../../role.service";
import { RoleEntity } from "src/modules/users/entities/role.entity";
import { PermissionService } from "src/modules/users/permissions/permission.service";

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
    constructor(
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService
    ) { }
    async execute({ input }: CreateRoleCommand): Promise<any> {
        
        const exitName = await this.roleService.findOne(input.name, 'name')
        if (exitName) {
            return { status: 500, message: 'role ນີ້ມີໃນລະບົບແລ້ວ' }
        }
        const entity = new RoleEntity()
        entity.name = input.name;
        entity.description = input.description;
        entity.permissions = await this.permissionService.getPermissions(input.permission_ids);

        const role = await this.roleService.create(entity);
        return { status: 200, message: 'ບັນທຶກສຳເລັດ', data: role }
    }

}