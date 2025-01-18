"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || "7d";
const userDB = models_1.default.User;
class UserController {
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, age } = req.body;
                const userExists = yield userDB.findOne({
                    where: { email }
                });
                if (userExists) {
                    return res.status(400).send('Email is already associated with an account');
                }
                const pass = yield bcryptjs_1.default.hash(password, 10);
                const newUser = yield userDB.create({
                    username,
                    email,
                    age,
                    password: pass,
                });
                res.status(201).json({
                    message: "User created successfully",
                    user: {
                        id: newUser.id,
                        username: newUser.username,
                        email: newUser.email,
                        age: newUser.age,
                    },
                });
            }
            catch (error) {
                res.status(500).json({ error: "error" });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userName = req.body.username;
                const userPassword = req.body.password;
                const user = yield userDB.findOne({ where: { username: userName } });
                if (!user) {
                    return res.status(404).json('username not found');
                }
                const passwordValid = yield bcryptjs_1.default.compare(userPassword, user.password);
                if (passwordValid == false) {
                    return res.status(404).json('Incorrect email and password combination');
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, JWT_SECRET, {
                    expiresIn: JWT_REFRESH_EXPIRATION
                });
                res.status(200).send({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    accessToken: token,
                });
            }
            catch (error) {
                return res.status(500).send('Sign in error');
            }
        });
    }
}
exports.default = new UserController;
