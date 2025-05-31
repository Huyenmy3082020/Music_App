import { MigrationInterface, QueryRunner } from "typeorm";

export class Add1748526652145 implements MigrationInterface {
    name = 'Add1748526652145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "userId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "history" RENAME COLUMN "userId" TO "user_id"`);
    }

}
