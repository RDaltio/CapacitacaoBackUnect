import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbUsuario = process.env.DB_USER
const dbSenha = process.env.DB_PASS
mongoose.connect(`mongodb+srv://${dbUsuario}:${dbSenha}@cluster0.mvetumo.mongodb.net/?retryWrites=true&w=majority`);

let db = mongoose.connection;
export default db;