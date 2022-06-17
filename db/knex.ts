import knex from "knex";
import { knexSnakeCaseMappers } from "objection"
import config  from "./config";

const env = process.env.NODE_ENV || "development";

export default knex({...config[env], ...knexSnakeCaseMappers()})