import { Knex } from "knex";
const { createTimestampsProcedure } = require('./utilities/timestamps');

export async function up(knex: Knex): Promise<void> {
    await createTimestampsProcedure(knex);
}

export async function down(): Promise<void> {
}

