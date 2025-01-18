"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./Routes/user"));
const task_1 = __importDefault(require("./Routes/task"));
//For env File 
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// use with all origins
// app.use(cors({
//     origin: 'http://localhost:8000',
//     methods: ['GET', 'POST'],
//     credentials: true
// }))
app.use(user_1.default);
app.use(task_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
exports.default = app;
