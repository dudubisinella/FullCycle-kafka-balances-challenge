// balances/src/app.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Balance } from "./balance.entity";
import { BalanceService } from "./balance.service";
import { BalanceController } from "./balance.controller";
import { KafkaConsumerService } from "./kafka.consumer";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [Balance],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Balance]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService, KafkaConsumerService],
})
export class AppModule {}
