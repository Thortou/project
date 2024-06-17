import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ChangePasswordUserCommand } from "../../command/users/change-password-user.command";
import { UserService } from "../../../user.service";
import { hash } from "bcrypt";
@CommandHandler(ChangePasswordUserCommand)
export class ChangePasswordUserHandler implements ICommandHandler<ChangePasswordUserCommand> {
    constructor(
        private readonly _userService: UserService
    ) { }
    async execute({ user, changeDto }: ChangePasswordUserCommand): Promise<any> {
        const users = await this._userService.getOne(user.phone_number, 'phone')
        if (changeDto.password !== changeDto.confirm_password) {
            return {message: 'ລະຫັດຢືນຢັນຂອງທ່ານບໍ່ຖືກຕ້ອງ'}
        }
        users.password = await hash(changeDto.password, 10)
        await this._userService.update(users.id, users);
        return { status: 200, message: 'ປ່ຽນລະຫັດຜ່ານສຳເລັດ' }
    }
}