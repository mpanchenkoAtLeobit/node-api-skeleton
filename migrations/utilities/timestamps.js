const addTimestamps = (knex, tableName) => knex.schema.table(tableName, t => {
    t.timestamp('created_at').defaultTo(knex.raw('now()'));
    t.timestamp('updated_at').defaultTo(knex.raw('now()'));
});

const createModifiedAtTrigger = (knex, tableName) => knex.raw(
`CREATE TRIGGER update_updated_at_column BEFORE UPDATE
          ON "${tableName}" FOR EACH ROW EXECUTE PROCEDURE
          update_updated_at_column();`);

const createTimestampsProcedure = knex => knex.raw(`
  CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS '
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';`);

module.exports = {
    addTimestamps,
    createModifiedAtTrigger,
    createTimestampsProcedure
};