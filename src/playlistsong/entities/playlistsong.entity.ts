import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Song } from 'src/songs/entities/songs.entity';
import { ObjectType, Field } from '@nestjs/graphql';  // Import các decorator từ @nestjs/graphql
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';

@ObjectType()  // Đánh dấu PlaylistSong là ObjectType của GraphQL
@Entity()
export class PlaylistSong {
  @Field()  // Thêm Field cho playlist_id
  @PrimaryColumn()
  playlist_id: number;

  @Field()  // Thêm Field cho song_id
  @PrimaryColumn()
  song_id: number;

  @Field(() => Playlist)  // Thêm Field cho quan hệ với Playlist
  @ManyToOne(() => Playlist, (playlist) => playlist.playlistSongs, { onDelete: 'CASCADE' })
  playlist: Playlist;

  @Field(() => Song)  // Thêm Field cho quan hệ với Song
  @ManyToOne(() => Song, (song) => song.id, { onDelete: 'CASCADE' })
  song: Song;
}
