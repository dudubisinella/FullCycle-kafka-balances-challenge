import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Balance {
  @PrimaryColumn("uuid")
  accountId: string;

  @Column("numeric", { precision: 18, scale: 2, default: 0 })
  balance: string;

  @Column({ type: "timestamptz", nullable: true })
  updatedAt: Date;
}
