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

@Field(() => DeviceInfo)  // Thêm Field cho GraphQL
@Column('json')
deviceInfo: object;

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


@ObjectType()  
export class DeviceInfo {
  @Field()  
  os: string;

  @Field() 
  browser: string;

  @Field() 
  device: string;
}
