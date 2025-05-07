import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Đảm bảo rằng bạn đã thêm trang trí này cho class Like
export class LikeRes{
  

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  songId: number;

  @Field()
  created_at: Date;
}
