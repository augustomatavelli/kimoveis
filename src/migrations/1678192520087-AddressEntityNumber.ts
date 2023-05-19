import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressEntityNumber1678192520087 implements MigrationInterface {
    name = 'AddressEntityNumber1678192520087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" SET NOT NULL`);
    }

}
