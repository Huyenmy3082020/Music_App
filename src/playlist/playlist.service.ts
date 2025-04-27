import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistService {
    constructor (
        @InjectRepository(Playlist) private playlistRepository: Repository<Playlist>,
    ){}

    async createPlaylist(playlistCreateDto: any, userId: number): Promise<Playlist> {
        const playlist = this.playlistRepository.create({
            ...playlistCreateDto,
            user: { id: userId },
        }); 
        const savedPlaylist = await this.playlistRepository.save({
            ...playlist,
            user: { id: userId },
        });
        return  savedPlaylist;
}

async getPlaylist(userId: number): Promise<Playlist[]> {
    const playlists = await this.playlistRepository.find({
        where :{user: {id: userId}},
        relations: ['user'],
        select: {
        
            user: {
                id: true,
            
            },
        },
    })
   return playlists;
}
}
