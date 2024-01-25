import express from "express";
import usersController from "../controllers/usersController.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');

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

router
  .post("/users", usersController.registerUser)
  .post("/users/login", usersController.loginUser)
  .delete("/users/delete", authenticateUser, usersController.deleteUser);

export default router;