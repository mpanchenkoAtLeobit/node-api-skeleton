import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS postgis;');
}


export async function down(): Promise<void> {
}

