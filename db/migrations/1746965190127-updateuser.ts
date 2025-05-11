import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateuser1746965190127 implements MigrationInterface {
    name = 'Updateuser1746965190127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dd8cd9e50dd049656e4be1f7e8c" UNIQUE ("name"), CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "history" ("id" SERIAL NOT NULL, "listenedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "songId" integer, "userId" integer, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "song" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "artist" character varying NOT NULL, "album" character varying, "imageUrl" character varying, "duration" integer NOT NULL, "fileUrl" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "genre_id" integer, CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist_song" ("playlist_id" integer NOT NULL, "song_id" integer NOT NULL, "playlistId" integer, "songId" integer, CONSTRAINT "PK_a55ad75ae3d2148e4057e393bf2" PRIMARY KEY ("playlist_id", "song_id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("userId" integer NOT NULL, "songId" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f28aec8932e5a04ebd542107fa7" PRIMARY KEY ("userId", "songId"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user', 'moderator')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "refresh_token" character varying, "isActive" boolean NOT NULL DEFAULT true, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "subscription_type" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_a3e18c5e364defd6f2e9116a39f" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_ddede859326f675ad4d7261308f" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_song" ADD CONSTRAINT "FK_b3a2005c3364905c6bd7f3ac57f" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_song" ADD CONSTRAINT "FK_b4a58966c6c196987542ed84ad7" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_3f1f21e8cb7c886bf7ffc53a6f5" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_3f1f21e8cb7c886bf7ffc53a6f5"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`);
        await queryRunner.query(`ALTER TABLE "playlist_song" DROP CONSTRAINT "FK_b4a58966c6c196987542ed84ad7"`);
        await queryRunner.query(`ALTER TABLE "playlist_song" DROP CONSTRAINT "FK_b3a2005c3364905c6bd7f3ac57f"`);
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_ddede859326f675ad4d7261308f"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_a3e18c5e364defd6f2e9116a39f"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "playlist_song"`);
        await queryRunner.query(`DROP TABLE "song"`);
        await queryRunner.query(`DROP TABLE "history"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }

}
