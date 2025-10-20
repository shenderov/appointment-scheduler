import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Provider } from '@providers/entities/provider.entity';
import { Weekday } from '@shared-models/constants/common/weekdays';

@Entity('provider_hours')
@Unique(['providerId', 'weekday'])
export class ProviderHours {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Provider, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'providerId' })
  provider!: Provider;

  @Column()
  providerId!: number;

  @Column({ type: 'varchar' })
  weekday!: Weekday;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time' })
  endTime!: string;

  @Column({ default: false })
  isAvailable!: boolean;
}
