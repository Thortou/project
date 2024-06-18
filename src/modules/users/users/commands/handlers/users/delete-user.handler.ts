import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "../../command/users/delete-user.command";
import { UserService } from "../../../user.service";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    constructor(
        private readonly _userService: UserService
    ) { }
    async execute({ id }: DeleteUserCommand): Promise<any> {
        const user = await this._userService.getOne(id, 'id')
        if (!user) throw new NotFoundException({ message: 'ຜູ້ໃຊ້ນີ້ ບໍ່ພົບ' })
        await this._userService.delete(user.id)
        return { status: 200, message: 'ລົບຂໍ້ມູນສຳເລັດ!!' }
    }
}