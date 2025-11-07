import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Role } from '@shared-models/enums/auth/role.enum';
import { UserSettings } from '@users/entities/user-settings.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ type: 'timestamptz', nullable: true })
  passwordChangedAt?: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role!: Role;

  @OneToOne(() => UserSettings, (settings) => settings.user, {
    cascade: true,
    eager: true,
  })
  settings!: UserSettings;

  @CreateDateColumn()
  createdAt!: Date;
}
