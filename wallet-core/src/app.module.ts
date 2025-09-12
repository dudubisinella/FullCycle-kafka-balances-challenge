import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "./wallet.entity";
import { WalletService } from "./wallet.service";
import { KafkaProducerService } from "./kafka.producer";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [Wallet],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Wallet]),
  ],
  providers: [WalletService, KafkaProducerService],
  exports: [WalletService],
})
export class AppModule {}
