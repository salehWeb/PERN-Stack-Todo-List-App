import {Request, Response} from 'express';
import { Todo } from '../db/model/Todo';

// why i use 200 status code?
// because if i use 204 status code, the browser will not show the response body
// and the user will not see the updated todo
// so i use 200 status code
// and if have error the browser will show the error message

export const getTodos = async (req: Request, res: Response) => {
    await Todo.query().select().orderBy('created_at')
        .then(todos => res.status(200).json(todos))
        .catch(err => res.status(200).json(err.message));
}

export const createTodo = async (req: Request, res: Response) => {
    const {title} = req.body;
    await Todo.query().insert({title}).returning('*')
        .then(todo => res.status(200).json({msg: 'Todo created', todo}))
        .catch(err => res.status(200).json(err.message));
}

export const updateTodo = async (req: Request, res: Response) => {
    const {title, completed} = req.body;
    const {id} = req.params;
    await Todo.query().update({title, completed})
        .where({id}).returning('*').first()
        .then(todo => res.status(200).json({msg: 'Todo updated successfully', todo}))
        .catch(err => res.status(200).json(err.message));
}

export const deleteTodo = async (req: Request, res: Response) => {
    const {id} = req.params;
    await Todo.query().deleteById(id)
        .then(todo => res.status(200).json({msg: "Todo deleted successfully"}))
        .catch(err => res.status(200).json(err.message));
}

export const getTodo = async (req: Request, res: Response) => {
    const {id} = req.params;
    await Todo.query().findById(id).first()
        .then(todo => res.status(200).json(todo))
        .catch(err => res.status(200).json(err.message));
}