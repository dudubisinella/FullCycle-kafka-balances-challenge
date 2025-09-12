// balances/src/balance.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Balance } from "./balance.entity";

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly repo: Repository<Balance>
  ) {}

  async getBalance(accountId: string): Promise<Balance | null> {
    const b = await this.repo.findOne({ where: { accountId } });
    return b || null;
  }
}
