import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { VerifyUserCommand } from "../../command/users/verify-user.command";
import { UserService } from "../../../user.service";

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
    constructor(
        public readonly _userService: UserService
    ) { }
    async execute({ id }: VerifyUserCommand): Promise<any> {
        const verify = await this._userService.getOne(id, 'id')
        if (verify.verify_at) { return { status: 500, message: 'ບໍ່ສາມາດ verify ຊໍ້າ' } }
        verify.verify_at = new Date()
        await this._userService.update(verify.id, verify)
        return { status: 200, message: 'verify ສຳເລັດ' }
    }

}