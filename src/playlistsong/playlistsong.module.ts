import { Module, forwardRef } from '@nestjs/common';
import { PlaylistsongService } from './playlistsong.service';
import { PlaylistsongController } from './playlistsong.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistSong } from './entities/playlistsong.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { UserModule } from 'src/user/user.module';
import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistSong]),
    AuthModule,
    UserModule,
    SongsModule,
    PlaylistModule
  ],
  controllers: [PlaylistsongController],
  providers: [PlaylistsongService],
  exports: [PlaylistsongService],
})
export class PlaylistsongModule {}
