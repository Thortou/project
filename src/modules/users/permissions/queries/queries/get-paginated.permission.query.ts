import { QueryPermissionDto } from "../../dtos/query-permission.dto";

export class GetPaginatedPermissionQuery {
    constructor(
        public readonly query : QueryPermissionDto
    ){}
}