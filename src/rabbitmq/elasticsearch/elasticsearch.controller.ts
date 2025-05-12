import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('search')
export class ElasticsearchController{
  constructor(private readonly searchService: ElasticsearchService) {}
  

  @Post('index')
  async createIndex(@Body() body: any) {
    const { index, document } = body;
    try {
      await this.searchService.indexDocument(index, document);
      return { message: 'Document indexed successfully' };
    } catch (error) {
      return { error: 'Failed to index document', details: error.message };
    }
  }
 
  @Get('')
  async search(@Query('keyword') keyword: string) {
    try {
      const result = await this.searchService.search(keyword); 
      return result; 
    } catch (error) {
      return { error: 'Failed to search', details: error.message }; 
    }
  }  
  
}
