import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantModel } from "./tenant.model";

@Module({
    imports: [
        TypeOrmModule.forFeature([TenantModel])
    ]
})
export class TenantModule {}