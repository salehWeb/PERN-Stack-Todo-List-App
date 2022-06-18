import {Model} from "objection";

export class Todo extends Model {
    static get tableName() {
        return 'todo';
    }

    id!: string;
    title!: string;
    completed!: boolean;
    created_at!: string;
    updated_at!: string;

    $beforeInsert() {
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

}