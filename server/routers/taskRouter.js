import db from "../database/connection.js";

import Router from "express";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/api/tasks", async (req, res) => {
    const getTasks = await db.tasks.find({}).toArray();
    res.send([{tasks: getTasks}])
})

router.post("/tasks", async (req, res) => {
    const taskContent = req.body.tasktextarea
    const date = new Date().toLocaleString("en-GB")

    await db.tasks.insertOne({task: taskContent, date: String(date) , writer: req.session.name})
    res.redirect("/tasks")
})

//Deletes task on id
router.delete("/tasks/:id", async (req, res) => {
    const id = new ObjectId(req.params.id)
    await db.tasks.deleteOne({_id: id})
    res.redirect("/tasks")
})

export default router