import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Song } from 'src/songs/entities/songs.entity';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';


@Entity()
export class PlaylistSong {
  @PrimaryColumn()
  playlist_id: number;

  @PrimaryColumn()
  song_id: number;

  @ManyToOne(() => Playlist, playlist => playlist.playlistSongs, { onDelete: 'CASCADE' })
  playlist: Playlist;

  @ManyToOne(() => Song, song => song.id, { onDelete: 'CASCADE' })
  song: Song;
}
