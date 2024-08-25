// src/orders/order.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() order: Partial<OrderEntity>): Promise<OrderEntity> {
    return this.orderService.createOrder(order);
  }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }
}
