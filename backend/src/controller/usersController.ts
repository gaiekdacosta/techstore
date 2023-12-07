import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import { UserModel } from '../models/users';
import genToken from '../auth/token';

interface User {
    name: string;
    birthday: string;
    email: string;
    gender: string;
    password: string;
}

export default {
    async create(req: Request, res: Response) {
        const { userInfo }: { userInfo: User } = req.body;

        try {
            const existingUser = await UserModel.findOne({ user: userInfo.name });
            if (existingUser) {
                return res.status(400).json({ message: 'O nome já está cadastrado.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userInfo.password, salt);

            const newUser = new UserModel({
                name: userInfo.name,
                birthday: userInfo.birthday,
                email: userInfo.email,
                gender: userInfo.gender,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(200).json({ message: 'Usuário criado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Falha ao adicionar usuário.' });
        }
    },

    async login(req: Request, res: Response) {
        const { name, password } = req.body;

        try {
            const user = await UserModel.findOne({ name });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado!"});
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(401).json({ message: "A senha está errada!" });
            }

            const payload = { 
                id: user._id, 
                name: user.name,
                birthday: user.birthday,
                gender: user.gender,
                email: user.email,
            };

            const token = genToken(payload);
            return res.status(200).json({ message: "usuario logado com sucesso!", token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Falha ao logar usuário.' });
        }
    },

    async userDetails(req: Request, res: Response) {
        const { user } = req.params

        try {
            const userDetails = await UserModel.findOne({ name: user });

            if (!userDetails) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Retorne todos os dados do usuário
            return res.status(200).json({ userDetails });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Falha ao buscar usuário.' });
        }
    }
};
