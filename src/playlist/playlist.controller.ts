import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePlaylistDto } from './entities/dto/playlistdto';
@Controller('playlist')
export class PlaylistController {

    constructor(
        private   readonly playlistService: PlaylistService,
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createPlaylist(@Body() createPlaylistDto: CreatePlaylistDto, @Req() req: any) {
        const userId = req.user_data.id;
        const data = await this.playlistService.createPlaylist(createPlaylistDto, userId);
        return data;
    
    }
    @UseGuards(AuthGuard)
    @Get('getPlaylist')
    async getPlaylist(@Req() req: any) {
        const userId = req.user_data.id;
        const data = await this.playlistService.getPlaylist(userId);
        return data;
    }
}
