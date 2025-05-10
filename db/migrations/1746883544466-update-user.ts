import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1746883544466 implements MigrationInterface {
    name = 'UpdateUser1746883544466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "deviceInfo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "deviceInfo" json NOT NULL`);
    }

}
