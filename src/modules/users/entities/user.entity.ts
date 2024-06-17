import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { RoleEntity } from './role.entity';
@Entity({ name: 'users' })
@Index(['phone'])
@Index(['notification_topic'])
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  profile: Relation<ProfileEntity>;


  @Column({ unique: true, type: 'varchar', length: 100 })
  username: string;

  @Column({ unique: true, type: 'varchar', length: 100, nullable: true })
  phone?: string;

  @Column({ unique: true, type: 'varchar', length: 100, nullable: true })
  notification_topic?: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'varchar', length: 60, nullable: true })
  access_token?: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  verify_at?: Date;

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'user_to_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Relation<RoleEntity[]>;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;
}
