import { QueryUserDto } from "../../dtos/users/query-user.dto";

export class GetPaginatedUserQuery {
    constructor(
        public readonly query : QueryUserDto
    ){}
}