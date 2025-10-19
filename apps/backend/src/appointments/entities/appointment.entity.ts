import { Provider } from '@providers/entities/providers.entity';
import { Service } from '@services/entities/services.entity';
import { User } from '@users/entities/user.entity';
import { AppointmentStatus } from '@shared-models/enums/appointments/status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Provider, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'providerId' })
  provider!: Provider;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Service, { eager: true })
  @JoinColumn({ name: 'serviceId' })
  service!: Service;

  @Column({ type: 'timestamptz' })
  startTime!: Date;

  @Column({ type: 'text' })
  comments!: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status!: AppointmentStatus;
}
