import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ClinicHoursExceptionReason } from '@shared/models/enums';

@Entity('clinic_hours_exception')
export class ClinicHoursException {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'boolean', default: false })
  isOpen!: boolean;

  @Column({
    type: 'enum',
    enum: ClinicHoursExceptionReason,
  })
  reason!: ClinicHoursExceptionReason;

  @Column({ type: 'time', nullable: true })
  startTime?: string;

  @Column({ type: 'time', nullable: true })
  endTime?: string;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
