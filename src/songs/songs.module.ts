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
@Module({
  imports: [
    TypeOrmModule.forFeature([Song, Genre]),
    forwardRef(() => UserModule),    // Đảm bảo rằng SongsModule đã được nhập vào đây nếu sử dụng Song entity
  
  ],
  controllers: [SongController],
  providers: [SongService],
  exports: [SongService, TypeOrmModule],
})
export class SongsModule {}
