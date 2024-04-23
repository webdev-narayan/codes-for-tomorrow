import User from "../models/User.ts";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { issue } from './../utils/jwtHandler.ts';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(404).send({ message: "No account found associated with the email" })
        }
        const isPasswordMatch = await bcrypt.compare(password, user?.password || password)
        if (isPasswordMatch) {
            const token = issue({ id: user.id })
            return res.status(200).send({ token: token })
        } else {
            return res.status(400).send({ message: "Invalid login credentials" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}