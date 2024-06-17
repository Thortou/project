import { CreateUserDto } from "../../../dtos/users/create-user.dto";

export class CreateUserCommand {
    constructor(
        public readonly input: CreateUserDto
    ){}
}