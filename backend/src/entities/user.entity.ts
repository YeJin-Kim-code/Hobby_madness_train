import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    unique: true,
  })
  nickname!: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;
}