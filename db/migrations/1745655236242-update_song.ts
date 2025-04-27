import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSong1745655236242 implements MigrationInterface {
    name = 'UpdateSong1745655236242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" ADD "imageUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "imageUrl"`);
    }

}
