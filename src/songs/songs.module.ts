import { forwardRef, Module } from '@nestjs/common';
import { SongService } from './songs.service';
import { SongController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Song } from './entities/songs.entity';
import { Genre } from 'src/genre/entities/genry.entity';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { PlaylistsongModule } from 'src/playlistsong/playlistsong.module';
import { UserModule } from 'src/user/user.module';
import { SongsConsumerService } from 'src/rabbitmq/elasticsearch/songs-consumer.service';
import { ElasticsearchModule } from 'src/rabbitmq/elasticsearch/elasticsearch.module';
import { RabbitMQModule } from 'src/rabbitmq/elasticsearch/rabbitmq.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Song, Genre]),
    forwardRef(() => UserModule),    // Đảm bảo rằng SongsModule đã được nhập vào đây nếu sử dụng Song entity
  ElasticsearchModule,
  RabbitMQModule
  ],
  controllers: [SongController],
  providers: [SongService,SongsConsumerService],
  exports: [SongService, TypeOrmModule],
})
export class SongsModule {}
