import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Connect_DB } from 'src/common/enum/connect-ennum';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectDataSource(Connect_DB.MAIN)
        private _dataSource: DataSource,
    ) { }

    async create(input: RoleEntity): Promise<RoleEntity> {

        const res = await this._dataSource.getRepository(RoleEntity).save(input);

        return res;
    }

    async getWithPermission(id: number): Promise<RoleEntity> {
        const res = await this._dataSource
            .getRepository(RoleEntity)
            .createQueryBuilder('roles')
            .leftJoinAndSelect('roles.permissions', 'permission')
            .where('roles.id = :id', { id })
            .getOne();

        return res
    }

    async getWithUser(id: number): Promise<RoleEntity> {
        const res = await this._dataSource
            .getRepository(RoleEntity)
            .createQueryBuilder('roles')
            .leftJoinAndSelect('roles.users', 'user')
            .where('roles.id = :id', { id })
            .getOne();

        return res
    }

    async update(id: number, input: RoleEntity): Promise<RoleEntity> {
        const model = ({ ...input, id });

        const res = await this._dataSource.getRepository(RoleEntity).save(model);
        return res;
    }

    async getRoles(ids: number[]): Promise<RoleEntity[]> {
        const result = await this._dataSource
            .getRepository(RoleEntity)
            .createQueryBuilder('roles')
            .where('roles.id IN (:...ids)', { ids })
            .getMany();

        return result;
    }

    async findOne(value: any, key: keyof RoleEntity): Promise<any> {
        const res = await this._dataSource
            .getRepository(RoleEntity)
            .createQueryBuilder('roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .where(`roles.${key} = :${key}`, { [key]: value })
            .getOne();

        return res
    }

    async delete(id: number): Promise<RoleEntity> {
        const res = await this._dataSource
            .getRepository(RoleEntity)
            .softRemove({ id });

        return res;
    }

}
