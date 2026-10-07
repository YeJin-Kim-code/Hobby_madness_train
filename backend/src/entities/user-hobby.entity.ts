import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Hobby } from './hobby.entity';

@Entity('user_hobbies')
export class UserHobby {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Hobby)
  @JoinColumn({ name: 'hobby_id' })
  hobby!: Hobby;

  @Column({ name: 'is_pinned', default: true })
  isPinned!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}