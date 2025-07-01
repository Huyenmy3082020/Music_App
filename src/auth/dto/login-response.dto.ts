// auth/dto/login-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseDto {
  @Field()
  message: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  role: string;
}
