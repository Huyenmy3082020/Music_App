// src/genre/genre.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create_genra_dto';
import { Genre } from './entities/genry.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = this.genreRepository.create({
      ...createGenreDto,
      id: undefined, // Ensure id is not set during creation
    });
    return await this.genreRepository.save(genre);
  }

  // Read: Lấy tất cả genre
  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) {
      throw new Error('Genre not found');
    }
    return genre;
  }

  async update(id: number, createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = await this.findOne(id);
    if (!genre) {
      throw new Error('Genre not found');
    }
    Object.assign(genre, createGenreDto); // Cập nhật thuộc tính của genre
    return await this.genreRepository.save(genre);
  }

  // Delete: Xóa genre theo id
  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id);
    if (!genre) {
      throw new Error('Genre not found');
    }
    await this.genreRepository.remove(genre);
  }
}
