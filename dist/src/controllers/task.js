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
const taskModal = models_1.default.Task;
class TaskController {
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, status } = req.body;
                const userId = req.userId;
                const newTask = yield taskModal.create({ title, description, status, user_id: userId });
                res.status(201).json(newTask);
            }
            catch (error) {
                res.status(500).json({ err: "Error in Task Creation", error });
            }
        });
    }
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const getUserTasks = yield taskModal.findAll({
                    where: { user_id: userId, deletedAt: null }
                });
                res.status(201).json(getUserTasks);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ err: "Error in fetching User Tasks" });
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, status, taskId } = req.body;
                let dataToUpdate = {};
                if (title)
                    dataToUpdate['title'] = title;
                if (description)
                    dataToUpdate['description'] = description;
                if (status)
                    dataToUpdate['status'] = status;
                const updateTask = yield taskModal.update(dataToUpdate, { where: { id: taskId } });
                res.status(201).json(updateTask[0] == 1 ? "Task updated" : "Task not updated");
            }
            catch (error) {
                res.status(500).json({ err: "Error in updating User Task" });
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { taskId } = req.body;
                const deleteTask = yield taskModal.destroy({ where: { id: taskId } });
                res.status(201).json(deleteTask == 1 ? "Task deleted" : "Task not deleted");
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ err: "Error in user task deletion" });
            }
        });
    }
}
exports.default = new TaskController;
