import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistSongDto } from './dto/playlistsong-dto';
import { PlaylistSong } from './entities/playlistsong.entity';

@Injectable()
export class PlaylistsongService {
    constructor(
        @InjectRepository(PlaylistSong)
        private readonly playlistSongRepository: Repository<PlaylistSong>, // Inject PlaylistSongRepository
      ) {}
      
        async createPlayListSong(createPlaylistSongDto: CreatePlaylistSongDto): Promise<PlaylistSong> {
            const savedPlaylistSong = await this.playlistSongRepository.save(createPlaylistSongDto);
            return savedPlaylistSong; 
        }A
        
        async getPlaylistSong(id: string): Promise<PlaylistSong[]> {
            // Tìm playlist song theo id
            return this.playlistSongRepository.find({
                where: { playlist_id: Number(id) },
                relations: ['song'], // Giả sử bạn muốn lấy các bài hát trong playlist
            });
        }
        
    
  
}
