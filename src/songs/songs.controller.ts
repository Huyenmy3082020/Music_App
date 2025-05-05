import {
  Controller, Post, Get, Param, Body, Put, Delete,
  UploadedFiles, UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './entities/songs.entity';
import { SongService } from './songs.service';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as multer from 'multer';
import cloudinary from '../../helper/cloudinary';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService, private readonly amqpConnection: AmqpConnection,) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('files', 2))
  async createSong(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ): Promise<Song> {
    let fileUrl: string | null = null;
    let imageUrl: string | null = null;
  
    for (const file of files) {
      const buffer = file.buffer;
      const mimetype = file.mimetype;
  
      const streamUpload = (buffer: Buffer, folder: string, resourceType: 'image' | 'video') => {
        return new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type: resourceType,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );
          stream.end(buffer);
        });
      };
  
      if (mimetype.startsWith('audio/')) {
        const result = await streamUpload(buffer, 'audio', 'video');
        fileUrl = result.secure_url;
      } else if (mimetype.startsWith('image/')) {
        const result = await streamUpload(buffer, 'images', 'image');
        imageUrl = result.secure_url;
      }
    }
  
    const createSongDto: CreateSongDto = {
      ...body,
      fileUrl,
      imageUrl,
    };
  
    const newSong = await this.songService.createSong(createSongDto);
  
    console.log('New song created:', newSong);
    // Gửi message vào RabbitMQ
    await this.amqpConnection.publish('songs_exchange', 'songs.create', {
      action: 'create',
      index: 'songs',
      document: 
       newSong,
    });
  
    return newSong;
  }
  
  @Get()
  async findAll(): Promise<Song[]> {
    return await this.songService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Song> {
    return await this.songService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createSongDto: CreateSongDto
  ): Promise<Song> {
    return await this.songService.update(id, createSongDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.songService.remove(id);
  }
}
