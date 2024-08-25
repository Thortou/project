import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Connect_DB } from 'src/common/enum/connect-ennum';

@Injectable()
export class PartitionService {
    private readonly logger = new Logger(PartitionService.name);

    constructor(
        @InjectDataSource(Connect_DB.MAIN)
        private dataSource: DataSource
    ) { }

    async createPartitionIfNotExists(order_date: Date): Promise<void> {
        const currentYear = new Date().getFullYear();

        const tableName = `orders_${order_date}`;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            const partitionExists = await queryRunner.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = $1
                );
                `, [tableName]);

            if (!partitionExists[0].exists) {
                console.log(tableName);
                this.logger.log(`Creating partition table ${tableName}...`);

                await queryRunner.query(`
          CREATE TABLE "${tableName}" PARTITION OF orders
          FOR VALUES FROM ($1) TO ($2);
        `, [`${currentYear}-01-01`, `${currentYear + 1}-01-01`]);
            }
        } finally {
            await queryRunner.release();
        }
    }
}
