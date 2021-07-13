import { Knex } from "knex";
const {addTimestamps, createModifiedAtTrigger} = require('./timestamps');

const createTableWithTimestamps = async (knex: Knex, tableName: string, cb: (tableBuilder: Knex.CreateTableBuilder) => void) => {
    await knex.schema.createTable(tableName, cb);
    await addTimestamps(knex, tableName);
    await createModifiedAtTrigger(knex, tableName);
};

const dropTable = (knex: Knex , tableName: string) => knex.schema.dropTable(tableName);

module.exports = {
    createTableWithTimestamps,
    dropTable
};