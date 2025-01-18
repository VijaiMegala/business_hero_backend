import { Request, Response } from 'express';
import db from '../../models'
const taskModal = db.Task;


class TaskController {

  async createTask(req: Request, res: Response) {
    try {
      const { title, description, status } = req.body;
      const userId = req.userId;
      const newTask = await taskModal.create({ title, description, status, user_id: userId });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ err: "Error in Task Creation", error });
    }
  }

  async getTasks(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const getUserTasks = await taskModal.findAll({
        where: { user_id: userId, deletedAt: null }
      });
      res.status(201).json(getUserTasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ err: "Error in fetching User Tasks" });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { title, description, status, taskId } = req.body;
      let dataToUpdate: any = {};
      if (title)
        dataToUpdate['title'] = title;
      if (description)
        dataToUpdate['description'] = description;
      if (status)
        dataToUpdate['status'] = status;

      const updateTask = await taskModal.update(dataToUpdate, { where: { id: taskId } })
      res.status(201).json(updateTask[0] == 1 ? "Task updated" : "Task not updated");
    } catch (error) {
      res.status(500).json({ err: "Error in updating User Task" });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { taskId } = req.body;
      const deleteTask = await taskModal.destroy({ where: { id: taskId } })
      res.status(201).json(deleteTask == 1 ? "Task deleted" : "Task not deleted")
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: "Error in user task deletion" });
    }
  }
}
export default new TaskController;

