// wallet-core/src/kafka.producer.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);
  private producer: Producer;

  constructor() {
    const broker = process.env.KAFKA_BROKER || "kafka:9092";
    const kafka = new Kafka({ brokers: [broker] });
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
    this.logger.log("Kafka producer connected");
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    this.logger.log("Kafka producer disconnected");
  }

  async send(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    this.logger.log(`Message sent to ${topic}: ${JSON.stringify(message)}`);
  }
}
