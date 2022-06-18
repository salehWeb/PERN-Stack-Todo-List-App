import express, { IRouter } from 'express';
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controllers/todo';


const router: IRouter = express.Router();

router.get('/', getTodos)

router.get('/:id', getTodo)

router.post('/', createTodo)

router.put('/:id', updateTodo)

router.delete('/:id', deleteTodo)

export default router;