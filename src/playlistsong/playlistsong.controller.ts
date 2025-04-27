import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PlaylistsongService } from './playlistsong.service';
import { CreatePlaylistSongDto } from './dto/playlistsong-dto';

@Controller('playlistsong')
export class PlaylistsongController {
    constructor(
            private   readonly playlistSongService: PlaylistsongService,
        ){}
    
        @UseGuards(AuthGuard)
        @Post('create')
        async createPlaylist(@Body() createPlaylistSongDto: CreatePlaylistSongDto, @Req() req: any) {
            const data = await this.playlistSongService.createPlayListSong(createPlaylistSongDto);
            return data;
        
        }
        @UseGuards(AuthGuard)
        @Get('getPlaylist/:id')  // Đảm bảo bạn có tham số id trong URL
        async getPlaylistSong(@Param('id') id: string) {
            // Gọi service để lấy playlist song theo id
            const data = await this.playlistSongService.getPlaylistSong(id);
            return data;
        }
        
}
