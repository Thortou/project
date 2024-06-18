import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connect_DB } from "src/common/enum/connect-ennum";
import { DataSource } from "typeorm";
import { PermissionEntity } from "../entities/permission.entity";

@Injectable()
export class PermissionService {
  constructor(
    @InjectDataSource(Connect_DB.MAIN)
    private _dataSource: DataSource,
  ) {}

  async getPermissions(ids: number[]): Promise<PermissionEntity[]> {
    const result = await this._dataSource
      .getRepository(PermissionEntity)
      .createQueryBuilder('permissions')
      .where('permissions.id IN (:...ids)', { ids })
      .getMany();

    return result;
  }
}