import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true }
  }
);

const users = mongoose.model('users', usersSchema);

export default users;