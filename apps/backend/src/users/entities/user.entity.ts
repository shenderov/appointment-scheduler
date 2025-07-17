import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Role, CreatableRoles } from "@shared/models/enums";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: CreatableRoles,
    default: 'client',
  })
  role!: Role;

  @CreateDateColumn()
  createdAt!: Date;
}
