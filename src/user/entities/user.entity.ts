// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Like } from 'src/like/entities/like.entity';
import { History } from 'src/history/entities/history.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { RoleEnum } from './role.enum';
@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  avatar: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  refresh_token: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createAt: Date;

  @Field()
  @UpdateDateColumn()
  updateAt: Date;

  @Field(() => [Playlist])
  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @Field(() => [History])
  @OneToMany(() => History, (history) => history.user)
  histories: History[];

  @Field(() => [Subscription])
  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

    @Field(() => String)
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER }) 
  role: RoleEnum;


}
