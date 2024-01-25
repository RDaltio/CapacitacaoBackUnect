import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        console.log('Token não fornecido.');
        return res.status(401).send({ message: 'Token não fornecido.' });
    }

    console.log('Token recebido pelo servidor:', token);

    const secret = process.env.SECRET || 'DefaultSecretValue';

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar o token:', err);
            return res.status(401).send({ message: 'Token inválido.' });
        }

        console.log('Token decodificado:', decoded);

        req.user = decoded;
        next();
    });
};

export default authenticateUser;