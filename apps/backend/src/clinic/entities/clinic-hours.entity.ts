import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Weekday } from '@shared-models/constants/common/weekdays';

@Entity('clinic_hours')
@Unique(['weekday'])
export class ClinicHours {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  weekday!: Weekday;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time' })
  endTime!: string;

  @Column({ default: false })
  isOpen!: boolean;
}
