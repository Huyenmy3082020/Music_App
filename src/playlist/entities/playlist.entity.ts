import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PlaylistSong } from 'src/playlistsong/entities/playlistsong.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.playlists)
  user: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => PlaylistSong, ps => ps.playlist)
  playlistSongs: PlaylistSong[];
}
