import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSession22011745736395847 implements MigrationInterface {
    name = 'CreateSession22011745736395847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "deviceinfo" TO "deviceInfo"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "deviceInfo"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "deviceInfo" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "deviceInfo"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "deviceInfo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "deviceInfo" TO "deviceinfo"`);
    }

}
