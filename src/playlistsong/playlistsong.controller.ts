import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PlaylistsongService } from './playlistsong.service';
import { CreatePlaylistSongDto } from './dto/playlistsong-dto';
import { PlaylistService } from 'src/playlist/playlist.service';
import { SongService } from 'src/songs/songs.service';

@Controller('playlistsong')
export class PlaylistsongController {
    constructor(
            private  readonly playlistSongService: PlaylistsongService,
            private  readonly playlistService: PlaylistService,
            private  readonly songService: SongService,

        ){}
    
        @UseGuards(AuthGuard)
        @Post('create')
        async createPlaylist(@Body() createPlaylistSongDto: CreatePlaylistSongDto, @Req() req: any) {
            const data = await this.playlistSongService.createPlayListSong(createPlaylistSongDto);

            const song = await this.songService.findOne(data.song_id);
            return {
                message: 'Thêm bài hát vào playlist thành công',
                data:song
            };
        
        }
        @UseGuards(AuthGuard)
        @Get('getPlaylist/:id')  // Đảm bảo bạn có tham số id trong URL
        async getPlaylistSong(@Param('id') id: string) {
            // Gọi service để lấy playlist song theo id
            const data = await this.playlistSongService.getPlaylistSong(id);
            return data;
        }
        
}
