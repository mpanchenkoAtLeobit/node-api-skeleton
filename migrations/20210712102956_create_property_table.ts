import { Knex } from "knex";
const {createTableWithTimestamps, dropTable} = require('./utilities/tables');

export async function up(knex: Knex): Promise<void> {
    await createTableWithTimestamps(knex, 'Properties', (tableBuilder: Knex.CreateTableBuilder) => {
        tableBuilder.increments('id').unsigned().primary();
        tableBuilder.string('text').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    dropTable(knex, 'Properties')
}

