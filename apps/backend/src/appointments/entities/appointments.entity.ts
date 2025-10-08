import { Provider } from '@providers/entities/providers.entity';
import { Service } from '@services/entities/services.entity';
import { User } from '@users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type AppointmentStatus = 'scheduled' | 'cancelled' | 'completed';

@Entity('appointments')
export class Appointments {
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
    enum: ['scheduled', 'cancelled', 'completed'],
    default: 'scheduled',
  })
  status!: AppointmentStatus;
}
