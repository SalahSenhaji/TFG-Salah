import express from 'express';
import { getUsersByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !username || !password) {
            return res.status(400).send('Missing fields');
        }

        const existingUser = await getUsersByEmail(email);
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        // Envía una respuesta JSON con los datos del usuario registrado
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};