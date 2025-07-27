import express from "express";
import { Error } from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
import Task from "../models/Task";
import { describe } from "node:test";
import { error } from "console";
const tasksRouter = express.Router();

tasksRouter.get("/", auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const tasks = await Task.find({ user: user._id }).select("-user");
    res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({
        error,
      });
    }
  }
});

tasksRouter.post("/", auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const newTask = {
    user,
    title: req.body.title,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
  };
  const oneTask = new Task(newTask);
  await oneTask.save();
  const tasks = await Task.find({ user: user._id }).select("-user");
  res.status(200).send({
    message: "Task added",
    tasks,
  });
  try {
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({
        error,
      });
    }
  }
});

tasksRouter.delete("/:id", auth,async(req, res, next)=>{
    try{
        const user= (req as RequestWithUser).user
        let tasks = await Task.find({user:user._id}).select("-user");
        const {id} = req.params
        const index =  tasks.findIndex(item => item._id.toString() == id)

        if(index==-1){
            res.status(400).send({error:"No Such task Id"})
            return
        }
        await Task.deleteOne({_id:id});
        res.status(200).send({
            message:"Task Deleted",
        })
    }catch(error){
        if(error instanceof Error.ValidationError){
            res.status(400).send({error})
        }
        next(error)
    }
});

export default tasksRouter;
