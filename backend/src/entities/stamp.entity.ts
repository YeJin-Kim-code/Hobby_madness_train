import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Hobby } from "./hobby.entity";
import { HobbyRecord } from "./hobby-record.entity";

export enum StampType {
  RECORD_CREATED = "RECORD_CREATED",
  GOAL_ACHIEVED = "GOAL_ACHIEVED",
}

@Entity("stamps")
export class Stamp {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Hobby, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "hobby_id" })
  hobby!: Hobby;

  @ManyToOne(() => HobbyRecord, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "record_id" })
  record!: HobbyRecord;

  @Column({
    type: "enum",
    enum: StampType,
    default: StampType.RECORD_CREATED,
  })
  stampType!: StampType;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}