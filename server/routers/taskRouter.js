import db from "../database/connection.js";

import Router from "express";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/api/tasks", async (req, res) => {
    const getTasks = await db.tasks.find({}).toArray();
    res.send([{ tasks: getTasks }])
})

router.get("/api/tasks/:id", async (req, res) => {
    const id = new ObjectId(req.params.id)
    const getTask = await db.tasks.find({ _id: id }).toArray();
    res.send([{ task: getTask }])
})

//Creates a new task
router.post("/api/tasks", async (req, res) => {
    if(!req.session.role){
        res.status(401).send({message: "not session"})
    }else{
    const task = req.body
    task.date = new Date().toLocaleString("en-GB")
    task.writer = req.session.name
    try {
        await db.tasks.insertOne(task)
        res.status(200).send({ tasks: task })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    }
    
})

//Updates the task in tasks
router.patch("/api/tasks/:id", async (req, res) => {
    if(!req.session.role){
        res.status(401).send({message: "not session"})
    }else{
    const id = new ObjectId(req.params.id)
    const updateObject = req.body
    try {
        await db.tasks.updateOne({ _id: id }, { $set: updateObject })
        const updatedTask = await db.tasks.findOne({ _id: id })
        res.status(200).send({ tasks: updatedTask })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
})

//Deletes task on id
router.delete("/api/tasks/:id", async (req, res) => {
    if(!req.session.role){
        res.status(401).send({message: "not session"})
    }else{
    const id = new ObjectId(req.params.id)
    try {
        await db.tasks.deleteOne({ _id: id })
        res.status(200).send({ message: "deleted" })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
})

export default router