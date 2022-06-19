import { Request, Response } from 'express';
import client from '../db/config';

export const createUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    try {
        const { rows } = await client.query(`INSERT INTO "user" (name, password) VALUES ('${name}', '${password}') RETURNING *`)
        res.status(200).json({ msg: 'User created', rows })
    }
    catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}
