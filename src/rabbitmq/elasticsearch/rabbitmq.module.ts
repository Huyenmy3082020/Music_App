import { Module } from '@nestjs/common';
import { RabbitMQModule as RabbitMqCoreModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMqCoreModule.forRoot({
      exchanges: [
        {
          name: 'songs_exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672', // RabbitMQ URL (local docker hoặc cloud)
      connectionInitOptions: { wait: false },
    }),
  ],
  exports: [RabbitMqCoreModule],
})
export class RabbitMQModule {}
