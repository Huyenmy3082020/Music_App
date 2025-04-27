
// import { Like } from 'src/like/entities/like.entity';
import { Session } from '../../session/entities/session.entity';
import { History } from 'src/history/entities/history.entity';
import { Like } from 'src/like/entities/like.entity';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
// import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;


  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true,default:'null'})
  avatar: string;

  @Column({nullable: true,default:'null'})
  refresh_token: string;

  @Column({ default: true })
  isActive: boolean;

  
  @CreateDateColumn()
  createAt: Date;

  @CreateDateColumn()
  updateAt: Date;

  @OneToMany(() => Playlist, playlist => playlist.user)
  playlists: Playlist[];



  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @OneToMany(() => History, history => history.user)
  histories: History[];

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[];

  @Column({ default: 'user' })
  role: string; // 'user' | 'admin' | 'superadmin'


  @OneToMany(() => Session, session => session.user)  
  sessions: Session[];


}
