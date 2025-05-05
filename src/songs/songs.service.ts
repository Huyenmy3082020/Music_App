// src/song/song.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { Genre } from 'src/genre/entities/genry.entity';
import { Song } from './entities/songs.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  
async createSong(createSongDto: CreateSongDto): Promise<Song> {
    if (!createSongDto.genre_id) {
      throw new Error('Genre ID is required.');
    }
  
    let genre: Genre | null = await this.genreRepository.findOne({ where: { id: createSongDto.genre_id } });
  
    if (!genre) {
      throw new Error(`Genre with ID ${createSongDto.genre_id} not found.`);
    }
  
    const song = this.songRepository.create({
      ...createSongDto,
      genre, // Gắn genre vào song
    });
  
    // Lưu bài hát vào cơ sở dữ liệu
    return await this.songRepository.save(song);
  }
  

  // Read: Lấy tất cả song
  async findAll(): Promise<Song[]> {
    return await this.songRepository.find({
      relations: ['genre'], // Để lấy thông tin genre liên kết
    });
  }

  // Read: Lấy song theo id
  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOne({
      where: { id },
      relations: ['genre'], // Để lấy thông tin genre liên kết
    });

    if (!song) {
      throw new Error('Song not found');
    }

    return song;
  }

  async update(id: number, createSongDto: CreateSongDto): Promise<Song> {
    const song = await this.findOne(id);
    if (!song) {
      throw new Error('Song not found');
    }

    const genre = createSongDto.genre_id ? await this.genreRepository.findOne({ where: { id: createSongDto.genre_id } }) : null;

    Object.assign(song, createSongDto, { genre });
    return await this.songRepository.save(song);
  }

  // Delete: Xóa song theo id
  async remove(id: number): Promise<void> {
    const song = await this.findOne(id);
    if (!song) {
      throw new Error('Song not found');
    }
    await this.songRepository.remove(song);
  }
 
}
