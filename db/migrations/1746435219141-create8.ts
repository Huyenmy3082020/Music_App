import { MigrationInterface, QueryRunner } from "typeorm";

export class Create81746435219141 implements MigrationInterface {
    name = 'Create81746435219141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "PK_7c8a850a5b08cc353e9e5136647"`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "PK_b55e3ae723c108f7734447844ff" PRIMARY KEY ("song_id")`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "PK_b55e3ae723c108f7734447844ff"`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "song_id"`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "PK_f28aec8932e5a04ebd542107fa7" PRIMARY KEY ("userId", "songId")`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_3f1f21e8cb7c886bf7ffc53a6f5"`);
        await queryRunner.query(`ALTER TABLE "like" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like" ALTER COLUMN "songId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_3f1f21e8cb7c886bf7ffc53a6f5" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_3f1f21e8cb7c886bf7ffc53a6f5"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "like" ALTER COLUMN "songId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_3f1f21e8cb7c886bf7ffc53a6f5" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "PK_f28aec8932e5a04ebd542107fa7"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "song_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "PK_b55e3ae723c108f7734447844ff" PRIMARY KEY ("song_id")`);
        await queryRunner.query(`ALTER TABLE "like" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "PK_b55e3ae723c108f7734447844ff"`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "PK_7c8a850a5b08cc353e9e5136647" PRIMARY KEY ("user_id", "song_id")`);
    }

}
