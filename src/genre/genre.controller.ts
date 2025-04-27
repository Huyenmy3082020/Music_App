// src/genre/genre.controller.ts
import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateGenreDto } from './dto/create_genra_dto';
import { Genre } from './entities/genry.entity';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  // Create: Tạo mới genre
  @Post('create')
  async createGenre(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return await this.genreService.createGenre(createGenreDto);
  }

  @Get()
  async findAll(): Promise<Genre[]> {
    return await this.genreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Genre> {
    return await this.genreService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createGenreDto: CreateGenreDto,
  ): Promise<Genre> {
    return await this.genreService.update(id, createGenreDto);
  }

  // Delete: Xóa genre theo id
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.genreService.remove(id);
  }
}
