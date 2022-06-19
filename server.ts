import express, { Express } from 'express';
import dotenv from "dotenv"
import cors from "cors"
import todosRoute from './routes/todos'
import userRoute from './routes/users'
import path from 'path'
import fs from 'fs'

import client from "./db/config"


dotenv.config()
const app: Express = express();
const port = process.env.PORT || 5000;
const file = "todos"

var sql = fs.readFileSync(`${path.join(__dirname, `db/model/${file}.sql`)}`).toString();

app.use(express.json());

app.use(express.urlencoded({ limit: '1mb', extended: true }))

const corsOptions = { origin: "*" }

app.use(cors(corsOptions));

app.use("/api/todo", todosRoute)
app.use("/api/user", userRoute)

const connectToDb = async (): Promise<void> => {
    await client.connect()
    client.query(sql,
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Table created")
            }
        }
    )
}

connectToDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}
).catch(err => console.log(err))