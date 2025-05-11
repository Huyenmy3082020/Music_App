import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';
import { RoleEnum } from 'src/user/entities/role.enum';
import { Column } from 'typeorm';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER, 
  })
  role: RoleEnum;

}
