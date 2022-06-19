import express, { IRouter } from 'express';
import { createUser } from '../controllers/user';

const router: IRouter = express.Router()

router.post('/', createUser)

export default router;