import { Request, Response } from 'express';
import db from '../../models'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY || "default_secret_key";
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || "7d";


const userModal = db.User;

class UserController {

  async addUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const userExists = await userModal.findOne({
        where: { email }
      });
      if (userExists) {
        return res.status(400).send('Email is already associated with an account');
      }
      const pass = await bcrypt.hash(password, 10);
      const newUser = await userModal.create({
        username,
        email,
        password: pass,
      });
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "error in user creation" });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const userName = req.body.username;
      const userPassword = req.body.password;
      const user = await userModal.findOne({ where: { username: userName } });
      if (!user) {
        return res.status(404).json('user not registered');
      }
      const passwordValid = await bcrypt.compare(userPassword, user.password);
      if (passwordValid == false) {
        return res.status(404).json('Incorrect email or password combination');
      }
      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRATION
      });
      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: token,
      });

    } catch (error) {
      return res.status(500).send('user sign in error');
    }
  }
}
export default new UserController;

