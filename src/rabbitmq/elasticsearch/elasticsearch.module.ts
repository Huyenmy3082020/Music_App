import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchController } from './elasticsearch.controller'; 

@Module({
  imports: [
    NestElasticsearchModule.register({
      node: 'http://localhost:9200',
    headers: {
        'Accept': 'application/json',
      },
    }),
  ],
  controllers: [ElasticsearchController],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
