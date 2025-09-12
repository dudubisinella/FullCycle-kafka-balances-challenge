// balances/src/balance.controller.ts
import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { BalanceService } from "./balance.service";

@Controller("balances")
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(":accountId")
  async getOne(@Param("accountId") accountId: string) {
    const balance = await this.balanceService.getBalance(accountId);
    if (!balance) {
      throw new NotFoundException("Account not found");
    }
    return {
      accountId: balance.accountId,
      balance: balance.balance,
      updatedAt: balance.updatedAt,
    };
  }
}
