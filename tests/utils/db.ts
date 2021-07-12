import Knex from 'knex';

export async function truncate(knex: Knex, tableNames: string[]): Promise<void> {
    await Promise.all(tableNames.map(tableName => knex.raw(`TRUNCATE TABLE "${tableName}" CASCADE`)));
}

export function seed<T, F>(knex: Knex, tableName: string, data: F | F[]): Promise<T[]> {
    return knex(tableName).insert(data).returning('*');
}

export function toResponse(data: object | object[]) {
    return JSON.parse(JSON.stringify(data));
}
