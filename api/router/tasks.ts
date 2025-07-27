import express from "express"
import { Error } from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
import Task from "../models/Task";
import { describe } from "node:test";
const  tasksRouter =express.Router();


tasksRouter.get("/", (req, res, next)=>{
    try{

    }catch(error){
        if(error instanceof Error.ValidationError){
            res.status(400).send({
                error
            })
        }
    }
});

tasksRouter.post("/", auth,(req, res, next)=>{
    const user = (req as RequestWithUser).user;
    const newTask = {
        user,
        title:req.body.title,
        description:req.body.description,
        isCompleted:req.body.isCompleted,
    }
    const oneTask = new Task(newTask);
    oneTask.save();
    console.log(oneTask)
    res.send(user)
    try{

    }catch(error){
        if(error instanceof Error.ValidationError){
            res.status(400).send({
                error
            })
        }
    }
})

export default tasksRouter