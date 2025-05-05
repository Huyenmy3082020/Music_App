import { Module, Search, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
// import { UserModule } from './user/user.module';
 import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SongsModule } from './songs/songs.module';
import { GenreController } from './genre/genre.controller';
import { GenreModule } from './genre/genre.module';
import { PlaylistModule } from './playlist/playlist.module';
import { PlaylistsongService } from './playlistsong/playlistsong.service';
import { PlaylistsongController } from './playlistsong/playlistsong.controller';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PlaylistsongModule } from './playlistsong/playlistsong.module';
import { HistoryModule } from './history/history.module';
import { HistoryController } from './history/history.controller';
import { LikeService } from './like/like.service';
import { LikeController } from './like/like.controller';
import { LikeModule } from './like/like.module';
import { ElasticsearchModule } from './rabbitmq/elasticsearch/elasticsearch.module';
import { RabbitMQModule } from './rabbitmq/elasticsearch/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
   UserModule,
     AuthModule,
    PlaylistsongModule,
    SongsModule,
    GenreModule,
    PlaylistModule,
     LikeModule,
    SubscriptionsModule,
    HistoryModule,
    LikeModule,
    ElasticsearchModule,
    RabbitMQModule
  ],
  controllers: [AppController, HistoryController, LikeController],
  providers: [AppService],
})
export class AppModule {}