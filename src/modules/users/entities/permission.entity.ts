import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { PermissionDisplayName, PermissionName, PermissionType } from '../../../common/enum/permission-enum';

@Entity({ name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: 'enum', enum: PermissionName, unique: true })
  name!: PermissionName;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: PermissionType })
  type!: PermissionType;

  @Column({ type: 'enum', enum: PermissionDisplayName })
  display_name!: PermissionDisplayName;

  @ManyToMany(() => RoleEntity, (role) => role.permissions, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  roles: Relation<RoleEntity[]>;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;
}
