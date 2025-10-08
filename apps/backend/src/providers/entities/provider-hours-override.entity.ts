import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Provider } from '@providers/entities/providers.entity';

@Entity('provider_hours_override')
@Unique(['providerId', 'date'])
export class ProviderHoursOverride {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  providerId!: number;

  @ManyToOne(() => Provider, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'providerId' })
  provider!: Provider;

  @Column({ type: 'date' })
  date!: string;

  @Column({ default: false })
  isDayOff!: boolean;

  @Column({ type: 'time', nullable: true })
  startTime?: string;

  @Column({ type: 'time', nullable: true })
  endTime?: string;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
