"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = __importDefault(require("../controllers/task"));
const router = express_1.default.Router();
router.post("/createTask", (req, res) => task_1.default.createTask(req, res));
// router.get("/", (req: Request, res: Response) =>
//     taskController.loginUser(req, res)
// );
exports.default = router;
