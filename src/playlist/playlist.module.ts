import { forwardRef, Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PlaylistsongModule } from 'src/playlistsong/playlistsong.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),   
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService, TypeOrmModule],
})
export class PlaylistModule {}
