import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Hobby } from './hobby.entity';

@Entity('hobby_records')
export class HobbyRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Hobby)
  @JoinColumn({ name: 'hobby_id' })
  hobby!: Hobby;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ name: 'activity_date', type: 'date' })
  activityDate!: Date;

  @Column({ name: 'goal_achieved', default: false })
  goalAchieved!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}