
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GetDetailRoleQuery } from '../queries/get-detail-role.query';
import { Connect_DB } from 'src/common/enum/connect-ennum';
import { RoleEntity } from 'src/modules/users/entities/role.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetDetailRoleQuery)
export class GetDetailRoleRepository implements IQueryHandler<GetDetailRoleQuery> {

    constructor(
        @InjectDataSource(Connect_DB.MAIN)
        private readonly _dataSource: DataSource,
    ) { }

    async execute({ id }: GetDetailRoleQuery): Promise<RoleEntity> {
        const res = await this._dataSource
            .getRepository(RoleEntity)
            .createQueryBuilder('roles')
            .leftJoinAndSelect('roles.permissions', 'permission')
            .leftJoinAndSelect('roles.users', 'user')
            .where('roles.id = :id', { id })
            .getOne();
        if (!res) throw new NotFoundException({ message: 'ບົດບາດນີ້ບໍ່ມີໃນລະບົບ' })
        return res;
    }
}
