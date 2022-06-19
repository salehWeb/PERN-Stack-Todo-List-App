import { Request, Response } from 'express';
import client from '../db/config';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();
const secrete_JWT: string | undefined = process.env.SECRETE_JWT;


export const login = async (req: Request, res: Response) => {
    const { name, password } = req.body;
    try {
        const HashedPassword = await client.query(`SELECT password FROM "user" WHERE name = '${name}'`);
        if (!HashedPassword.rows[0]) {
            return res.status(404).json({ msg: " user not found " });
        } else {
            const isMatch = await bcrypt.compare(password, HashedPassword.rows[0].password);

            if (isMatch) {
                const { rows } = await client.query(`SELECT * FROM "user" WHERE name = '${name}' AND password = '${HashedPassword.rows[0].password}'`);
                console.log(rows)
                const token = jwt.sign({ id: rows[0].id }, secrete_JWT || "hi", { expiresIn: '3day' });
                const UserName: string = rows[0].name
                res.status(200).json({ msg: ' login success ', user: { UserName, token } })
            }

            else res.status(200).json({ msg: 'Wrong password' })
        }
    }
    catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}


export const signUp = async (req: Request, res: Response) => {
    const { name, password }: any = await req.body
    try {

        const { rows } = await client.query(`SELECT * FROM "user" WHERE name = '${name}'`)
        if (rows.length === 0) {
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            const { rows } = await client.query(`INSERT INTO "user" (name, password) VALUES ('${name}', '${hashPassword}') RETURNING *`)
            const token = jwt.sign({ id: rows[0].id }, secrete_JWT || "hi", { expiresIn: '3day' });
            const UserName: string = rows[0].name
            res.status(200).json({ msg: 'User created', user: { UserName, token } })

        } else {
            res.status(200).json({ msg: ' User already exist try login or change name ' })
        }
    } catch (error: any) {
        res.status(200).json({ msg: error.message })
        console.log(error)
    }
}


export const logout = async (req: Request, res: Response) => {
    const { password, name } = req.body;
    try {
        const HashedPassword = await client.query(`SELECT password FROM "user" WHERE name = '${name}'`);
        if (!HashedPassword.rows[0]) {
            return res.status(404).json({ msg: " user not found " });
        } else {
            const isMatch = await bcrypt.compare(password, HashedPassword.rows[0].password);

            if (isMatch) {
                const { rows } = await client.query(`DELETE FROM "user" WHERE name = '${name}' AND password = '${HashedPassword.rows[0].password}' RETURNING *`);
                console.log(rows)
                res.status(200).json({ msg: ' logout success ' })
            }

            else res.status(200).json({ msg: 'Wrong password' })
        }
    } catch (error: any) {
        res.status(200).json(error.message)
        console.log(error)
    }
}