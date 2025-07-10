import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from '../../services/entities/services.entity';
import { User } from '../../users/entities/user.entity';

export enum Specialty {
  MASSAGE = 'Massage',
  THERAPIST = 'Therapist',
  CHIROPRACTOR = 'Chiropractor',
  NURSE = 'Nurse',
  NUTRICIOLOGIST = 'Nutriciologist',
  PODIATOR = 'Podiator',
  OTHER = 'Other',
}

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'enum', enum: Specialty })
  specialty!: Specialty;

  @Column()
  title!: string;

  @Column()
  licenseName!: string;

  @Column()
  licenseNumber!: string;

  @Column({ nullable: true })
  bio!: string;

  @ManyToMany(() => Service, (service) => service.providers)
  @JoinTable()
  services!: Service[];

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user!: User;
}
