import express, { Request, Response, Router } from "express";
import userController from "../controllers/user";

module.exports = function (router: Router) {
  router.get("/user", async (req: Request, res: Response) => {
    try {
      await userController.loginUser(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }).post("/user", async (req: Request, res: Response) => {
    try {
      await userController.addUser(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
