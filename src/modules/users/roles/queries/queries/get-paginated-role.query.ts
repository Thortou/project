import { QueryRoleDto } from "../../dtos/query-role.dto";

export class GetPaginateRoleQuery {
    constructor(public readonly input: QueryRoleDto) {}
  }