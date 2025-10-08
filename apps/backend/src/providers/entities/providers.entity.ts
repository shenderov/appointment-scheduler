import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Service } from '@services/entities/services.entity';
import { User } from '@users/entities/user.entity';
import { ProviderHours } from '@providers/entities/provider-hours.entity';
import { ProviderHoursOverride } from '@providers/entities/provider-hours-override.entity';
import { Appointments } from '@appointments/entities/appointments.entity';

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
  @PrimaryGeneratedColumn()
  id!: number;

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

  @OneToMany(() => ProviderHours, (hours) => hours.provider, { cascade: true })
  providerHours!: ProviderHours[];

  @OneToMany(() => ProviderHoursOverride, (override) => override.provider, {
    cascade: true,
  })
  providerOverrides!: ProviderHoursOverride[];

  @OneToMany(() => Appointments, (appointment) => appointment.provider)
  appointments!: Appointments[];
}
