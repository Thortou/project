import { CreateRoleDto } from "../../dtos/create-role.dto";

export class CreateRoleCommand {
    constructor (
        public readonly input: CreateRoleDto
    ){}
}