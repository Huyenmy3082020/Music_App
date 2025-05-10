// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Like } from 'src/like/entities/like.entity';
import { History } from 'src/history/entities/history.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Session } from '../../session/entities/session.entity';
import { Role } from 'src/role/entities/role.entity';
import { UserRole } from 'src/role/entities/user_role.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

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

  @Field()
  @Column({ default: 'user' })
  role: string; // Vai trò chính mặc định (có thể bỏ qua khi dùng bảng user_roles)

  @Field(() => [Session])
  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @Field(() => [Role]) 
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: Role[];
}
