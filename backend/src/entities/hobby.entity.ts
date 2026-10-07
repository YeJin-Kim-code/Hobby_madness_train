import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("hobbies")
export class Hobby {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: number;

  @Column({ type: "varchar", length: 50, unique: true })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description!: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}