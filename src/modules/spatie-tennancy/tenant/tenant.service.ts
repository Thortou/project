import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connect_DB } from "src/common/enum/connect-ennum";
import { DataSource } from "typeorm";
import { TenantModel } from "./tenant.model";

@Injectable()
export class TenantService {
    constructor(
        @InjectDataSource(Connect_DB.MAIN)
        private readonly dataSource: DataSource
    ){}

    async getTenantById(tenantId: string) {
        return this.dataSource.getRepository(TenantModel)
        .createQueryBuilder('tenants')
        .where('tenants.id = :tenantId', {tenantId})
        .getOne()
    }
}