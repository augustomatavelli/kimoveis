import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressEntity1678192120270 implements MigrationInterface {
    name = 'AddressEntity1678192120270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" DROP NOT NULL`);
    }

}
