import { UserEntity } from "src/modules/users/entities/user.entity";

export class UserGenerateCommand {
    constructor(
        public readonly user: UserEntity
    ){}
}