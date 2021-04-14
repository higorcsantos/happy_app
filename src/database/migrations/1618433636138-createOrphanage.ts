import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanage1618433636138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: "decimal",
                    precision: 2,
                    scale: 10
                },
                {
                    name: 'longitude',
                    type: "decimal",
                    precision: 2,
                    scale: 10
                },
                {
                    name: 'about',
                    type: 'text'
                },
                {
                    name: "instructions",
                    type: "text"
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false
                }

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages')
    }

}
