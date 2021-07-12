import { Knex } from "knex";
const {createTimestampsProcedure}            = require('./utilities/timestamps');
const {createTableWithTimestamps, dropTable} = require('./utilities/tables');


export async function up(knex: Knex): Promise<void> {
    await createTableWithTimestamps(knex, 'Properties', t => {
        t.increments('id').unsigned().primary();
        t.string('text').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    dropTable(knex, 'Properties')
}

