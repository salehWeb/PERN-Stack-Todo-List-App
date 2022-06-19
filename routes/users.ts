import express, { IRouter } from 'express';
import { signUp, login, logout } from '../controllers/user';

const router: IRouter = express.Router()

router.post('/signup', signUp)

router.post('/login', login)

router.post('/logout', logout)

export default router;