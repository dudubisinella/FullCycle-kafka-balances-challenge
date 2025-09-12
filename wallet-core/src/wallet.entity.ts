import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  owner: string;

  @Column("numeric", { precision: 18, scale: 2, default: 0 })
  balance: string;
}
