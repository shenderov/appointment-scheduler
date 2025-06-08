import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: ['client', 'provider', 'admin'], default: 'client' })
  role: 'client' | 'provider' | 'admin';

  @CreateDateColumn()
  createdAt: Date;
}
