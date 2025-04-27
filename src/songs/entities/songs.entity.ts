import { Genre } from 'src/genre/entities/genry.entity';
import { History } from 'src/history/entities/history.entity'; // <- thêm cái này
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ nullable: true })
  album: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Genre, { nullable: true })
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;

  @Column('int')
  duration: number;

  @Column()
  fileUrl: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  // 👇 Thêm dòng này để nối với History
  @OneToMany(() => History, (history) => history.song)
  histories: History[];
}
