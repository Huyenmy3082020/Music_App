import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(private readonly elasticsearchService: NestElasticsearchService) {}

 async indexDocument(index: string, document: any) {
  try {
    const response = await this.elasticsearchService.index({
      index: index,
      body: document,
      
    });
    console.log("Song data indexed successfully", response);
  } catch (error) {
    console.error('Error indexing song data to Elasticsearch:', error);
  }
}

  async search(keyword: string) {
    try {
      const response = await this.elasticsearchService.search({
        index: 'songs',
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: keyword,
                  fields: ['title^3', 'artist^2', 'album', 'genre.name'],
                  fuzziness: 'AUTO',
                  operator: 'and',
                },
              },
              {
                match_phrase_prefix: {
                  title: keyword,
                },
              },
            ],
          },
        },
      });
      return response.hits.hits;
    } catch (error) {
      console.error('Error searching in Elasticsearch:', error);
      throw error;
    }
  }
  
  
}
