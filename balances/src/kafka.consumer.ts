// balances/src/kafka.consumer.ts
import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Kafka, Consumer } from "kafkajs";
import { Balance } from "./balance.entity";

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private consumer: Consumer;

  constructor(
    @InjectRepository(Balance)
    private readonly repo: Repository<Balance>
  ) {
    const broker = process.env.KAFKA_BROKER || "kafka:9092";
    this.consumer = new Kafka({ brokers: [broker] }).consumer({
      groupId: "balances-service-group",
    });
  }

  async onModuleInit() {
    const topic = process.env.KAFKA_TOPIC || "wallet.balance.updated";
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;

        try {
          const payload = JSON.parse(message.value.toString());
          const { accountId, balance, timestamp } = payload;

          const record = this.repo.create({
            accountId,
            balance,
            updatedAt: new Date(timestamp),
          });

          await this.repo.save(record);
          this.logger.log(`Processed event for ${accountId} -> ${balance}`);
        } catch (err) {
          this.logger.error("Failed processing message", err);
        }
      },
    });
  }
}
