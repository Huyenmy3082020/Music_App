import { ObjectType, Field } from '@nestjs/graphql';
import { Genre } from 'src/genre/entities/genry.entity';
import { History } from 'src/history/entities/history.entity'; 
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@ObjectType()  
@Entity()
export class Song {
  @Field()  
  @PrimaryGeneratedColumn()
  id: number;

  @Field() 
  @Column()
  title: string;

  @Field() 
  @Column()
  artist: string;

  @Field({ nullable: true })  
  @Column({ nullable: true })
  album: string;

  @Field({ nullable: true }) 
  @Column({ nullable: true })
  imageUrl: string;

  @Field(() => Genre, { nullable: true }) 
  @ManyToOne(() => Genre, { nullable: true })
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;

  @Field()  
  @Column('int')
  duration: number;

  @Field()  
  @Column()
  fileUrl: string;

  @Field()
  @CreateDateColumn()
  createAt: Date;

  @Field()  
  @UpdateDateColumn()
  updateAt: Date;

  @Field(() => [History])  
  @OneToMany(() => History, (history) => history.song)
  histories: History[];
}
