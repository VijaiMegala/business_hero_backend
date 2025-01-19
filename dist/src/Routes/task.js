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
const task_1 = __importDefault(require("../controllers/task"));
const auth_1 = __importDefault(require("../middlewares/auth"));
module.exports = function (router) {
    router.get("/task", auth_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield task_1.default.getTasks(req, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    })).post("/task", auth_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield task_1.default.createTask(req, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    })).put("/task", auth_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield task_1.default.updateTask(req, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    })).delete("/task", auth_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield task_1.default.deleteTask(req, res);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }));
};
