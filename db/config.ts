import { Client } from "pg"
import dotenv from "dotenv"

dotenv.config()

const pgUrl = process.env.DB_URL;

const client = new Client({
    connectionString: pgUrl,
    ssl: {
        rejectUnauthorized: false
    }
})

export default client;