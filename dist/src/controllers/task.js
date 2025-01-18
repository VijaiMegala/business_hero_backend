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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const taskDB = models_1.default.Task;
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
class TaskController {
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Bearer <token>
                if (!token) {
                    return res.status(401).json({ error: 'Access denied. No token provided.' });
                }
                const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Log payload object in terminal
                const user_id = decoded.id;
                const { title, description, status } = req.body;
                const newTask = yield taskDB.create({ title, description, status, user_id });
                res.status(201).json(newTask);
            }
            catch (error) {
                res.status(500).json({ error: "error" });
            }
        });
    }
}
exports.default = new TaskController;
