import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() 
@Entity()
export class Subscription {
  @Field() 
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)  
  @ManyToOne(() => User, user => user.subscriptions)
  user: User;

  @Field()  
  @Column()
  subscription_type: string;

  @Field()  
  @Column({ type: 'timestamp' })
  start_date: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Field()  
  @CreateDateColumn()
  created_at: Date;
}
