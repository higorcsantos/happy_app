import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImage1618448338895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "images",
            columns:[
                 {
                        name: 'id',
                        type: 'uuid',
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        isPrimary: true
                 },
                 {
                     name: 'path',
                     type: 'varchar'
                 },
                 {
                     name: 'orphanage_id',
                     type: 'uuid'
                 } 
            ],
            foreignKeys: [
                {
                    name: 'image_orphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
