import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Song } from 'src/songs/entities/songs.entity';
import { ObjectType } from '@nestjs/graphql';

@Entity()
export class Like {
  @PrimaryColumn()
  userId: number;  // Cột userId sẽ là một phần của khóa chính

  @PrimaryColumn()
  songId: number;  // Cột songId sẽ là một phần của khóa chính

  @ManyToOne(() => User, user => user.likes)
  user: User;  // Mối quan hệ với User

  @ManyToOne(() => Song, song => song.id)
  song: Song;  // Mối quan hệ với Song

  @CreateDateColumn()
  created_at: Date;  // Thời gian người dùng "like" bài hát
}
