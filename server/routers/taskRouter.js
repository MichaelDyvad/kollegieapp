import db from "../database/connection.js";

import Router from "express";



const router = Router();

router.get("/api/home", async (req, res) => {
    const getTasks = await db.tasks.find({}).toArray();
    res.send([{tasks: getTasks}])
})

router.post("/home", async (req, res) => {
    const taskContent = req.body.tasktextarea
    const date = new Date().toLocaleString("en-GB")

    await db.tasks.insertOne({task: taskContent, date: String(date) , writer: req.session.name})
    res.redirect("/home")
})

export default router