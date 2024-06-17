import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmOption } from "src/common/configurations/typeorm.config";

@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmOption())],
})
export class TypeOrmRepositoryModule {}