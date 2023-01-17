import Router from "express";
import { ObjectId } from "mongodb";
import db from "../database/connection.js";

const router = Router();

router.get("/api/laundry", async (req, res) => {
    const getLaundry = await db.laundry.find({}).toArray()
    res.send([{ laundry: getLaundry }])
})

router.patch("/api/laundry/:id", async (req, res) => {
    const id = new ObjectId(req.params.id)
    const updateObject = req.body
    if(!req.session.role){
        res.status(401).send({message: "not session"})
    }else{
    try {
        await db.laundry.updateOne({ _id: id }, { $set: updateObject })
        const updatedLaundry = await db.laundry.findOne({ _id: id })
        res.status(200).send({ laundry: updatedLaundry })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }}

})

router.patch("/api/laundry", async (req, res) => {
    if(!req.session.role){
        res.status(401).send({message: "not session"})
    }else{
    try {
        const getLaundry = await db.laundry.find({}).toArray();
        getLaundry.forEach(laundry => {
            db.laundry.updateOne({ _id: laundry._id }, { $set: { room: "" } })
        })
        const updatedLaundry = await db.laundry.find({}).toArray()
        res.status(200).send({laundry: updatedLaundry})
    } catch (error) {
        res.status(500).send({ message: error.message });
    }}
})

export default router;