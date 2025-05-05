import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ElasticsearchService } from './elasticsearch.service';

@Injectable()
export class SongsConsumerService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @RabbitSubscribe({
    exchange: 'songs_exchange',
    routingKey: 'songs.create',
    queue: 'songs_create_queue',
  })
  async handleNewSong(message: any) {
    console.log('Received new song from queue:', message);


    try {
      await this.elasticsearchService.indexDocument('songs', JSON.parse(JSON.stringify(message.document)));
      console.log('Song synchronized to Elasticsearch');
    } catch (error) {
      console.error('Error syncing song to Elasticsearch:', error);
    }
  }
}
