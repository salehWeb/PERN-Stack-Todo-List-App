import express, { Express } from 'express';
import dotenv from "dotenv"
import cors from "cors"
import todosRoute from './routes/todos'
import userRoute from './routes/users'
import client from "./db/config"


dotenv.config()
const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ limit: '1mb', extended: true }))

const corsOptions = { origin: "*" }

app.use(cors(corsOptions));

app.use("/api/todo", todosRoute)
app.use("/api/user", userRoute)

client.connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port} and connected to db`);
    })
}).catch((error) => {
    console.log(error)
    client.end()
})