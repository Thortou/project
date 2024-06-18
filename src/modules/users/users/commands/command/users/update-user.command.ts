import { UpdateUserDto } from "../../../dtos/users/update-user.dto";

export class UpdateUserCommand {
    constructor(
        public readonly id: number,
        public readonly input: UpdateUserDto,
    ){}
}