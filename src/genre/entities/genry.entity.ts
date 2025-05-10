import { ObjectType, Field } from '@nestjs/graphql';  // Thêm import cho GraphQL
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()  
@Entity()
export class Genre {
  @Field() 
  @PrimaryGeneratedColumn()
  id: number;

  @Field()  
  @Column({ unique: true })
  name: string; 

  @Field()  
  @CreateDateColumn()
  createAt: Date;

  @Field() 
  @UpdateDateColumn()
  updateAt: Date;
}
