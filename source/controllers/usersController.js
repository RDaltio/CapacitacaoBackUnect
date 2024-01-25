import users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class usersController {

    static registerUser = async (req, res) => {
        try {
            const user = new users(req.body);

            // Hash da senha
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;

            await user.save();

            res.status(201).send({
                message: 'Usuário cadastrado com sucesso',
                user: user.toJSON()
            });
        } catch (err) {
            res.status(500).send({ message: `${err.message} - Falha ao cadastrar usuário` });
        }
    }

    static loginUser = async (req, res) => {
        const { email, password } = req.body;

        try {
            // Verifica se o usuário existe no banco de dados
            const user = await users.findOne({ email });

            if (!user) {
                console.log('Usuário não encontrado.');
                return res.status(401).send({ message: 'Credenciais inválidas.' });
            }

            // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                console.log('Senha incorreta.');
                return res.status(401).send({ message: 'Credenciais inválidas.' });
            }

            // Se as credenciais são válidas, você pode gerar um token JWT
            const token = this.generateToken(user);

            res.status(200).json({ message: 'Login bem-sucedido!', token });
        } catch (err) {
            console.error('Erro durante o login:', err);
            res.status(500).send({ message: err.message });
        }
    }

    static generateToken = (user) => {
        const payload = {
            userId: user._id,
            email: user.email,
            // Adicione outros dados do usuário que você deseja incluir no token
        };

        const secret = process.env.SECRET || 'DefaultSecretValue';
        const token = jwt.sign(payload, secret, { expiresIn: '1d' }); // Substitua 'seuSegredo' por uma chave secreta mais segura

        return token;
    };

    static deleteUser = async (req, res) => {
        const userId = req.user.userId; // Você pode obter o ID do usuário do token
    
        try {
          // Desativa a conta, mas não a exclui fisicamente
          await users.findByIdAndUpdate(userId, { active: false });
    
          res.status(200).send({ message: 'Conta excluída com sucesso.' });
        } catch (error) {
          console.error('Erro ao excluir conta:', error);
          res.status(500).send({ message: 'Erro interno do servidor.' });
        }
      }
}

export default usersController;
