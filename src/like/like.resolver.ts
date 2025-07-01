import { Like } from './entities/like.entity';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { LikeRes } from './dto/like';
import { LikeCreateDto } from './dto/create_likedto';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeServie: LikeService) {}
  @Query(() => [LikeRes])
  async getAllLikes(): Promise<Like[]> {
    return this.likeServie.findAll();
  }
  @Mutation(() => LikeRes)
  async createLike(
    @Args('likedto') likedto: LikeCreateDto,
    @Context() context: any,
  ) {
    return this.likeServie.createLike(likedto, context.req.user_data.id);
  }
}
