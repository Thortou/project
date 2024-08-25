
import { InjectDataSource } from "@nestjs/typeorm";
import { Connect_DB } from "src/common/enum/connect-ennum";
import { DataSource, SelectQueryBuilder } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { camelToSnakeCase } from "src/common/utils/mapper";
import { ProfileEntity } from "../entities/profile.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { RoleEntity } from "../entities/role.entity";
import { queryDto } from "src/app.controller";
import moment from "moment";
import { QueryUserDto } from "./dtos/users/query-user.dto";
import { IPaginated } from "src/common/interface/paginated.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectDataSource(Connect_DB.MAIN)
        private readonly _dataSource: DataSource
    ) { }

    async create(input: UserEntity): Promise<any> {
        const user = await this._dataSource.getRepository(UserEntity).save(input)
        if (user.profile) {
            user.profile.user_id = user.id;
            await this._dataSource.getRepository(ProfileEntity).save(user.profile);
        }

        return { status: 200, message: 'ບັນທຶກຂໍ້ມູນສຳເລັດ' }
    }

    //getPaginated
    async getPaginated({
          page,
          limit,
          offset,
          column,
          sort_order,
          username,
          phone,
      }: QueryUserDto): Promise<IPaginated<UserEntity>> {
        const result = this._dataSource
          .getRepository(UserEntity)
          .createQueryBuilder('users')
          .leftJoinAndSelect('users.roles', 'roles')
          .leftJoinAndSelect('users.profile', 'profiles')
          .leftJoinAndSelect('roles.permissions', 'permissions')
    
    
        if (username) {
          result.andWhere('users.username LIKE :username', {
            username: `%${username}%`,
          });
        }
    
        if (phone) {
          result.andWhere('users.phone LIKE :phone', {
            phone: `%${phone}%`,
          });
        }
    
        if (limit) result.limit(limit); 
        if (offset) result.offset(offset);
        if (page) result.offset((page - 1) * limit);
        if (column && sort_order) result.orderBy(`users.${column}`, sort_order);
    
        const resListData = await result.getManyAndCount();
    
        return { data: resListData[0], total: resListData[1], limit, offset, page };
      }

    //findOne
    async getOne(value: any, key: keyof UserEntity): Promise<UserEntity> {
        const column = camelToSnakeCase(key);

        const res = await this._dataSource
            .getRepository(UserEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.profile', 'profile')
            .leftJoinAndSelect('users.roles', 'roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .where(`users.${column} = :${key}`, { [key]: value })
            .getOne();

        return res
    }
    async update(id: number, input: UserEntity) {
        const model = ({ ...input, id })
        const res = await this._dataSource.getRepository(UserEntity).save(model);

        if (res.profile) {
            res.profile.user_id = res.id;
            await this._dataSource.getRepository(ProfileEntity).save(res.profile);
        }
        return res
    }

    async delete(id: number): Promise<UserEntity> {
        const res = await this._dataSource
            .getRepository(UserEntity)
            .softRemove({ id });

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

    private get queryBuilder(): SelectQueryBuilder<UserEntity> {
        return this._dataSource
            .getRepository(UserEntity).createQueryBuilder()
    }

    async getPage(
        input: queryDto,
        page: number,
        pageSize: number,
    ): Promise<UserEntity[]> {
        const queryBuilder = this.queryBuilder;
        // this.applyFilters(queryBuilder, input);
        queryBuilder.skip((page - 1) * pageSize).take(pageSize);
        const data = await queryBuilder.getMany();
        return data;
    }

    /**
     * data for export excel
     * @param item
     */
    async flattenData(item: any) {
        return {
            id: item.id,
            username: item.username,
            phone: item.phone,
        };
    }
}