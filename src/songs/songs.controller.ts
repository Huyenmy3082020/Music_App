import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './entities/songs.entity';
import { SongService } from './songs.service';

import cloudinary from '../../helper/cloudinary';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import streamUpload from 'src/helper/streamUpload';
@Controller('song')
export class SongController {
  constructor(
    private readonly songService: SongService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('files', 2))
  async createSong(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ): Promise<Song> {
    const uploadPromises = files.map((file) => {
      if (file.mimetype.startsWith('audio/')) {
        return streamUpload(file.buffer, 'audio', 'video');
      } else if (file.mimetype.startsWith('image/')) {
        return streamUpload(file.buffer, 'images', 'image');
      }
      return null;
    });

    const results = await Promise.all(uploadPromises);
    let fileUrl = null;
    let imageUrl = null;

    results.forEach((result) => {
      if (!result) return;
      if (result.resource_type === 'video') fileUrl = result.secure_url;
      else if (result.resource_type === 'image') imageUrl = result.secure_url;
    });

    const createSongDto: CreateSongDto = {
      ...body,
      fileUrl,
      imageUrl,
    };

    const newSong = await this.songService.createSong(createSongDto);

    console.log('New song created:', newSong);
    this.amqpConnection.publish('songs_exchange', 'songs.create', {
      action: 'create',
      index: 'songs',
      document: newSong,
    });

    return newSong;
  }

  @Get()
  async findAll(): Promise<Song[]> {
    return await this.songService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createSongDto: CreateSongDto,
  ): Promise<Song> {
    return await this.songService.update(id, createSongDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.songService.remove(id);
  }
  @Get('sort')
  async getSongSort(@Query('sort') sort: string): Promise<Song[]> {
    return this.songService.getSongSort(sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Song> {
    return await this.songService.findOne(id);
  }
}
