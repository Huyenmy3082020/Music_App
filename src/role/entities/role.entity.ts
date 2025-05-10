import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { UserRole } from './user_role.entity';

@ObjectType() 
@Entity()
export class Role {
  @Field()  
  @PrimaryGeneratedColumn()
  id: number;

  @Field() 
  @Column()
  name: string;

  @Field(() => [UserRole])  
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
