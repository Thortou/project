import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPaginatedPermissionQuery } from "../queries/get-paginated.permission.query";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connect_DB } from "src/common/enum/connect-ennum";
import { DataSource } from "typeorm";
import { PermissionEntity } from "src/modules/users/entities/permission.entity";

@QueryHandler(GetPaginatedPermissionQuery)
export class GetPaginatedPermissionHandler implements IQueryHandler<GetPaginatedPermissionQuery> {
    constructor(
        @InjectDataSource(Connect_DB.MAIN)
        private readonly _dataSource: DataSource,
    ) { }
    async execute({ query: { limit, offset, page, name, display_name, column, sort_order } }: GetPaginatedPermissionQuery): Promise<any> {
        const result = this._dataSource
            .getRepository(PermissionEntity)
            .createQueryBuilder('permissions');

        if (name)
            result.andWhere('permissions.name LIKE :name', { name: `%${name}%` });

        if (display_name)
            result.andWhere('permissions.display_name LIKE :displayName', {
                displayName: `%${display_name}%`,
            });

        const restotal = await result.getCount();

        if (limit) result.limit(limit);
        if (offset) result.offset(offset);
        if (page) result.offset((page - 1) * limit);
        if (column && sort_order)
            result.orderBy(`permissions.${column}`, sort_order);

        const resListData = await result.getMany();

        return { data: resListData, total: restotal, limit, offset, page };
    }

}