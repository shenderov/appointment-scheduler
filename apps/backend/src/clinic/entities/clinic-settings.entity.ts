import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clinic_settings')
export class ClinicSettings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', default: 60 })
  maxBookingDays!: number;

  @Column({ type: 'int', default: 120 })
  minAdvanceMinutes!: number;

  @Column({ type: 'int', default: 15 })
  intervalMinutes!: number;

  @Column({ type: 'boolean', default: true })
  allowBooking!: boolean;
}
