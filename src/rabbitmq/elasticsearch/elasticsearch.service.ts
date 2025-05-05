import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(private readonly elasticsearchService: NestElasticsearchService) {}

  async indexDocument(index: string, document: any) {
    try {
      // Make sure to pass the correct index and document structure
      const response = await this.elasticsearchService.index({
        index: index,  // Use the index name passed in the arguments
        body: document, // Directly use the document here
      });
      console.log("Song data indexed successfully", response);
    } catch (error) {
      console.error('Error indexing song data to Elasticsearch:', error);
    }
  }
  async search(keyword: string) {
    try {
      const { body } = await this.elasticsearchService.search({
        index: 'songs',
        body: {
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
                    title: {
                      query: keyword,
                    },
                  },
                },
              ],
            },
          },
        },
      });
      return body.hits.hits;
    } catch (error) {
      console.error('Error searching in Elasticsearch:', error);
      throw error;
    }
  }
  
}
