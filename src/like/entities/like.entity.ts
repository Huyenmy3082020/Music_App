import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Song } from 'src/songs/entities/songs.entity';

@Entity()
export class Like {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  song_id: number;

  @ManyToOne(() => User, user => user.likes)
  user: User;

  @ManyToOne(() => Song, song => song.id)
  song: Song;

  @CreateDateColumn()
  created_at: Date;
}
