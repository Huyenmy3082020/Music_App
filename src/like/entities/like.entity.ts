import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Song } from 'src/songs/entities/songs.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()  
@Entity()
export class Like {
  @Field()  
  @PrimaryColumn()
  userId: number; 

  @Field()  
  @PrimaryColumn()
  songId: number;  

  @Field(() => User) 
  @ManyToOne(() => User, user => user.likes)
  user: User;  

  @Field(() => Song)  
  @ManyToOne(() => Song, song => song.id)
  song: Song;  

  @Field()  
  @CreateDateColumn()
  created_at: Date; 
}
