import Router from "express";
import { ObjectId } from "mongodb";
import db from "../database/connection.js";

const router = Router();

router.get("/api/laundry", async (req, res) => {
    const getLaundry = await db.laundry.find({}).toArray()
    res.send([{laundry: getLaundry}])
})

router.patch("/api/laundry/:id", async (req, res) => {
    const id = new ObjectId(req.params.id)
    const updateObject = req.body
    await db.laundry.updateOne({ _id: id}, {$set: updateObject})
    res.redirect("/laundry")
})

export default router;