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
      const result = await this.searchService.search(keyword); // Gọi service để tìm kiếm
      return result; // Trả về kết quả tìm kiếm
    } catch (error) {
      return { error: 'Failed to search', details: error.message }; // Xử lý lỗi khi có vấn đề
    }
  }  
  
}
