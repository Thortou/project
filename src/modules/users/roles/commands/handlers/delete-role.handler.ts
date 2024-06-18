import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteRoleCommand } from "../commands/delete-role.command";
import { RoleService } from "../../role.service";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
    constructor(
        private roleService: RoleService
    ) { }
    async execute({ id }: DeleteRoleCommand): Promise<any> {
        const role = await this.roleService.findOne(id, 'id');
        if (!role) throw new NotFoundException({ message: 'ບົດບາດນີ້ ບໍ່ມີ' })
        await this.roleService.delete(role.id)
        return { status: 200, message: 'ລົບຂໍ້ມູນສຳເລັດ' }
    }
}