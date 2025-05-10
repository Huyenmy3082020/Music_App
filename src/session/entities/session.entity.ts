import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()  // Đánh dấu Session là ObjectType cho GraphQL
@Entity()
export class Session {
  @Field()  // Thêm Field cho GraphQL
  @PrimaryGeneratedColumn()
  id: number;

  @Field()  
  @Column()
  userId: number;

  @Field()  
  @Column()
  refreshToken: string;

  @Field() 
  @Column()
  createdAt: Date;

  @Field()  
  @Column()
  expiresAt: Date;

  @Field() 
  @Column({ default: true })
  isActive: boolean;

  @Field(() => User)  
  @ManyToOne(() => User, user => user.sessions)
  user: User;
}

