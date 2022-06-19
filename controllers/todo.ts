import { Request, Response } from 'express';
import { Todo } from '../db/model/Todo';

// why i use 200 status code?
// because if i use 204 status code, the browser will not show the response body
// and the user will not see the updated todo
// so i use 200 status code
// and if have error the browser will show the error message

export const getTodos = async (req: Request, res: Response) => {
    try {

        const todos = await Todo.query().select().orderBy('created_at')
        res.status(200).json(todos)

    } catch (error: any) {
        res.status(500).json(error.message);
        console.log(error)
    }
}

export const createTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    try {

        const todo = await Todo.query().insert({ title }).returning('*')
        res.status(200).json({ msg: 'Todo created', todo })

    } catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    const { title, completed } = req.body;
    const { id } = req.params;
    try {

        const todo = await Todo.query().update({ title, completed }).where({ id }).returning('*').first()
        res.status(200).json({ msg: 'Todo updated successfully', todo })
    } catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const todo = await Todo.query().deleteById(id)
        res.status(200).json({ msg: 'Todo deleted successfully' })
    } catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}

export const getTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const todo = await Todo.query().findById(id).first()
        res.status(200).json(todo)
    } catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}