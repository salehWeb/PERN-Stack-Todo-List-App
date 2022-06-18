import express, {Express} from 'express';
import dotenv from "dotenv"
import cors from "cors"
import knex from './db/knex'
import { Model } from 'objection'
import todosRoute from './routes/todos'

Model.knex(knex)
dotenv.config()

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ limit: '50mb', extended: true }))

const corsOptions = { origin: "*" }

app.use(cors(corsOptions));

app.use("/api/todos", todosRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
