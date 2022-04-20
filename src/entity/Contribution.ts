import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Contribution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  value: number;
}
