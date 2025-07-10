import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Provider } from '../../providers/entities/providers.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ type: 'int', name: 'duration_min', nullable: false })
  durationMin!: number;

  @Column({ type: 'int', name: 'break_min', nullable: false })
  breakMin!: number;

  @ManyToMany(() => Provider, (provider) => provider.services)
  providers!: Provider[];
}
