import db from "../database/connection.js";

import Router from "express";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/api/tasks", async (req, res) => {
    const getTasks = await db.tasks.find({}).toArray();
    res.send([{tasks: getTasks}])
})

router.get("/api/tasks/:id", async (req, res) => {
    const id = new ObjectId(req.params.id)
    const getTask = await db.tasks.find({_id: id}).toArray();
    res.send([{task: getTask}])
})

//Creates a new task
router.post("/tasks", async (req, res) => {
    const taskContent = req.body.tasktextarea
    const date = new Date().toLocaleString("en-GB")

    await db.tasks.insertOne({task: taskContent, date: String(date) , writer: req.session.name})
    res.redirect("/tasks")
})

//Updates the task in tasks
router.patch("/tasks/:id", async (req, res) => {
    const id = new ObjectId(req.params.id)
    const updateObject = req.body
    await db.tasks.updateOne({ _id: id }, { $set: updateObject})
    res.redirect("/tasks")
})

//Deletes task on id
router.delete("/tasks/:id", async (req, res) => {
    const id = new ObjectId(req.params.id)
    await db.tasks.deleteOne({_id: id})
    res.redirect("/tasks")
})

export default router