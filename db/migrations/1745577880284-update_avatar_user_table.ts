import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAvatarUserTable1745577880284 implements MigrationInterface {
    name = 'UpdateAvatarUserTable1745577880284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying DEFAULT 'null'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refresh_token" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refresh_token" SET DEFAULT 'null'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refresh_token" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refresh_token" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
