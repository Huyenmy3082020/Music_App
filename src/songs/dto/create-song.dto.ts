// src/song/dto/create-song.dto.ts
import { IsString, IsOptional, IsInt, IsUrl } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsOptional()
  @IsString()
  album?: string;

  @IsOptional()
  @IsInt()
  genre_id?: number;

  @IsInt()
  duration: number;

  @IsUrl()
  fileUrl: string; 

  imageUrl?: string; 
}
