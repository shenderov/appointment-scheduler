import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@users/entities/user.entity';

@Entity('user_settings')
export class UserSettings {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.settings, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @Column({ default: true })
  emailNotifications!: boolean;

  @Column({ default: false })
  browserNotifications!: boolean;

  @Column({ default: true })
  shareData!: boolean;

  @Column({ default: true })
  personalizedAds!: boolean;
}
