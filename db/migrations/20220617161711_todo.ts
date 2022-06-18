import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('todo', table => {
        // make id as primary key and id can not by null
        table
        .increments('id')
        .primary()

        table.string('title').notNullable();

        table.boolean('completed').notNullable().defaultTo("false");

        // update and create value by default equal to current time
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('todo');
}
