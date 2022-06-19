import { Request, Response } from 'express';
import client from '../db/config';

// why i use 200 status code?
// because if i use 204 status code, the browser will not show the response body
// and the user will not see the updated todo
// so i use 200 status code
// and if have error the browser will show the error message,,,

// i will need to use jwt for users authentication 
// so i will need to get the user id from the token
// and i will need to insert the user id in the todo table
// const user_id = req.user.id;

export const createTodo = async (req: Request, res: Response) => {
    const { title, description, user_id } = req.body;
    try {

        const { rows } = await client.query(`INSERT INTO "todo" (title, description, user_id) VALUES ('${title}', '${description}', '${user_id}') RETURNING *`)
        res.status(200).json({ msg: 'Todo created', rows })

    } catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const { rows } = await client.query(`SELECT * FROM "todo"`)
        res.status(200).json(rows)
    } catch (error: any) {
        res.status(200).json(error.message);
        console.log(error)
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { rows } = await client.query(`DELETE FROM "todo" WHERE id = '${id}' RETURNING *`)
        res.status(200).json({ msg: 'Todo deleted', rows })
    } catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const { rows } = await client.query(`UPDATE "todo" SET title = '${title}', description = '${description}' WHERE id = '${id}' RETURNING *`)
        res.status(200).json({ msg: 'Todo updated', rows })
    } catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}

export const getOneTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { rows } = await client.query(`SELECT * FROM "todo" WHERE id = '${id}'`)
        res.status(200).json(rows)
    } catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}