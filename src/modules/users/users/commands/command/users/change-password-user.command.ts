import { ChangePasswordUserDto } from "../../../dtos/users/change-password.user.dto";

export class ChangePasswordUserCommand {
    constructor(
        public readonly user: any,
        public readonly changeDto: ChangePasswordUserDto,
    ){}
}