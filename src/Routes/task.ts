import { Request, Response, NextFunction, Router } from "express";
import taskController from "../controllers/task";
import authenticateUser from "../middlewares/auth";

module.exports = function (router: Router) {
    router.get("/task", authenticateUser, async (req: Request, res: Response) => {
        try {
            await taskController.getTasks(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }).post("/task", authenticateUser, async (req: Request, res: Response) => {
        try {
            await taskController.createTask(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }).put("/task", authenticateUser, async (req: Request, res: Response) => {
        try {
            await taskController.updateTask(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }).delete("/task", authenticateUser, async (req: Request, res: Response) => {
        try {
            await taskController.deleteTask(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    })
}
