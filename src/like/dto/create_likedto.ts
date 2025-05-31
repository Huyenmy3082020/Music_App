import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LikeCreateDto {
    @Field()
    songId: number;
      @Field()
    created_at: Date;
      @Field()
    updated_at: Date;
      @Field()
    isActive: boolean;
}