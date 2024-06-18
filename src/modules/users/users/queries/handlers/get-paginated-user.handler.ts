import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPaginatedUserQuery } from "../queries/get-paginated-user.query";
import { UserService } from "../../user.service";

@QueryHandler(GetPaginatedUserQuery)
export class GetPaginatedUserHandler implements IQueryHandler<GetPaginatedUserQuery> {
    constructor(
        private readonly userService: UserService
    ) { }
    async execute({ query }: GetPaginatedUserQuery): Promise<any> {
        return await this.userService.getPaginated(query)
    }
}