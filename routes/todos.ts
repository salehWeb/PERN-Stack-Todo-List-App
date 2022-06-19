import express, { IRouter } from 'express';
import { createTodo, getAllTodos } from '../controllers/todo';

const router: IRouter = express.Router();

router.post('/', createTodo)

router.get('/', getAllTodos)

export default router;