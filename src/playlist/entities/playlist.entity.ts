import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';  // Import các decorator từ @nestjs/graphql
import { User } from '../../user/entities/user.entity';
import { PlaylistSong } from 'src/playlistsong/entities/playlistsong.entity';

@ObjectType()  // Đánh dấu Playlist là một ObjectType của GraphQL
@Entity()
export class Playlist {
  @Field()  // Thêm Field để expose id trong GraphQL
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)  // Thêm Field để expose quan hệ với User trong GraphQL
  @ManyToOne(() => User, (user) => user.playlists)
  user: User;

  @Field()  // Thêm Field để expose tên Playlist trong GraphQL
  @Column()
  name: string;

  @Field({ nullable: true })  // Thêm Field để expose mô tả Playlist trong GraphQL
  @Column({ nullable: true })
  description: string;

  @Field()  // Thêm Field để expose ngày tạo Playlist trong GraphQL
  @CreateDateColumn()
  created_at: Date;

  @Field(() => [PlaylistSong])  // Thêm Field để expose quan hệ PlaylistSong trong GraphQL
  @OneToMany(() => PlaylistSong, (ps) => ps.playlist)
  playlistSongs: PlaylistSong[];
}
