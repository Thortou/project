import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GetPaginateRoleQuery } from '../queries/get-paginated-role.query';
import { Connect_DB } from 'src/common/enum/connect-ennum';
import { IPaginated } from 'src/common/interface/paginated.interface';
import { RoleEntity } from 'src/modules/users/entities/role.entity';

@QueryHandler(GetPaginateRoleQuery)
export class GetPaginateRole implements IQueryHandler<GetPaginateRoleQuery> {
    constructor(
        @InjectDataSource(Connect_DB.MAIN)
        private readonly _dataSource: DataSource,
    ) { }

    async execute({
        input: { limit, offset, page, name, column, sort_order },
    }: GetPaginateRoleQuery): Promise<IPaginated<RoleEntity>> {
        const result = this._dataSource
            .getRepository(RoleEntity)
            .createQueryBuilder('roles')
            .where('roles.is_default = :isDefault', { isDefault: false });

        if (name) result.andWhere('roles.name LIKE :name', { name: `%${name}%` });

        const restotal = await result.getCount();

        if (limit) result.limit(limit);
        if (offset) result.offset(offset);
        if (page) result.offset((page - 1) * limit);
        if (column && sort_order) result.orderBy(`roles.${column}`, sort_order);

        const resListData = await result.getMany();

        return { data: resListData, total: restotal, limit, offset, page };
    }
}
