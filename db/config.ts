import { Client } from "pg"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"

dotenv.config()

const pgUrl = process.env.DB_URL;

const client = new Client({
    connectionString: pgUrl,
    ssl: {
        rejectUnauthorized: false
    }
})

client.query(fs.readFileSync(`${path.join(__dirname, `model/todos.sql`)}`).toString(), (err, res) => {
    if (err) console.log(err)
    else console.log("Table todo exist")
})

client.query(fs.readFileSync(`${path.join(__dirname, `model/users.sql`)}`).toString(), (err, res) => {
    if (err) console.log(err)
    else console.log("Table user exist")
})

export default client;