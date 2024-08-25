// src/orders/order.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  order_date: Date;

  @Column('decimal')
  amount: number;
}
