import { GetDetailUserRepository } from "./detail-user.handler";
import { GetPaginatedUserHandler } from "./get-paginated-user.handler";

export const queryUser = [
    GetDetailUserRepository,
    GetPaginatedUserHandler
]