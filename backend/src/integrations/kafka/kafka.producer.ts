import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class KafkaProducer {
  private readonly logger = new Logger(KafkaProducer.name);

  async emit(topic: string, message: unknown) {
    this.logger.log(`kafka.emit topic=${topic} payload=${JSON.stringify(message)}`);
    return { topic, accepted: true };
  }
}
