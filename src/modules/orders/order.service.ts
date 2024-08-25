// src/orders/order.service.ts
import { Injectable } from '@nestjs/common';
import { Connect_DB } from 'src/common/enum/connect-ennum';
import { DataSource } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { PartitionService } from './partition/partition.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectDataSource(Connect_DB.MAIN)
    private readonly _dataSource: DataSource,
    private partitionService: PartitionService
  ) {}

  async createOrder(order: Partial<OrderEntity>): Promise<OrderEntity> {
    await this.partitionService.createPartitionIfNotExists(order.order_date);
    return this._dataSource.getRepository(OrderEntity).save(order);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this._dataSource.getRepository(OrderEntity).find();
  }
}
