import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'tenants'})
export class TenantModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  database_name: string;
}