import { Module } from '@nestjs/common';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchController } from './elasticsearch.controller'; // <- Thêm dòng này

@Module({
  imports: [
    NestElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  controllers: [ElasticsearchController], // <- Thêm dòng này để đăng ký controller
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
