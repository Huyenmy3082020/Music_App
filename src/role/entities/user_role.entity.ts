import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from './role.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()  // Đảm bảo đây là kiểu GraphQL
@Entity()
export class UserRole {
  @Field()  // Chỉ rõ kiểu cho GraphQL
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)  // Chỉ rõ kiểu dữ liệu cho "user"
  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => Role)  // Chỉ rõ kiểu dữ liệu cho "role"
  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}