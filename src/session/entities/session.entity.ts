import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  refreshToken: string;

  @Column('json')
  deviceInfo: object;
  
  @Column()
  createdAt: Date;

  @Column()
  expiresAt: Date;

  @Column({ default: true })
  isActive: boolean

  @ManyToOne(() => User, user => user.sessions)
  user: User;
}
