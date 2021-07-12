const {addTimestamps, createModifiedAtTrigger} = require('./timestamps');

const createTableWithTimestamps = async (knex, tableName, cb) => {
    await knex.schema.createTable(tableName, cb);
    await addTimestamps(knex, tableName);
    await createModifiedAtTrigger(knex, tableName);
};

const dropTable = ({schema}, tableName) => schema.dropTable(tableName);

module.exports = {
    createTableWithTimestamps,
    dropTable
};