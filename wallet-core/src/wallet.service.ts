// wallet-core/src/wallet.service.ts
import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "./wallet.entity";
import { KafkaProducerService } from "./kafka.producer";

@Injectable()
export class WalletService implements OnModuleInit {
  private readonly logger = new Logger(WalletService.name);

  constructor(
    @InjectRepository(Wallet)
    private readonly repo: Repository<Wallet>,
    private readonly kafkaProducer: KafkaProducerService
  ) {}

  async onModuleInit() {
    await this.seedAccounts();
  }

  private async seedAccounts() {
    const accounts = [
      this.repo.create({ owner: "Alice", balance: "100.00" }),
      this.repo.create({ owner: "Bob", balance: "250.00" }),
      this.repo.create({ owner: "Carol", balance: "0.00" }),
    ];

    for (const acc of accounts) await this.repo.save(acc);

    const topic = process.env.KAFKA_TOPIC || "wallet.balance.updated";
    for (const acc of accounts) {
      await this.kafkaProducer.send(topic, {
        accountId: acc.id,
        balance: acc.balance,
        timestamp: new Date().toISOString(),
      });
    }

    // Simula update após 5s
    setTimeout(async () => {
      const acc = accounts[0];
      acc.balance = "75.50";
      await this.repo.save(acc);
      await this.kafkaProducer.send(topic, {
        accountId: acc.id,
        balance: acc.balance,
        timestamp: new Date().toISOString(),
      });
      this.logger.log(`Sent simulated update for ${acc.id}`);
    }, 5000);

    this.logger.log("Wallet seed done. Kafka events published.");
  }
}
