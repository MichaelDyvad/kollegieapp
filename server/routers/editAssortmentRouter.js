import db from "../database/connection.js";

import { Router } from "express";
import { ObjectId } from "mongodb";
const router = Router()

//Add to assortment
router.post("/api/editassortment", async (req, res) => {
    const updateObject = req.body
    try{
        await db.assortment.insertOne(updateObject)
        res.status(200).send({ assortment: updateObject })
    }catch (error) {
        res.status(500).send({ message: error.message });
    }  
})

//Edit assortment
router.patch("/api/editassortment/:id", async (req, res) => {
    const updateObject = req.body
    const id = new ObjectId(req.params.id)

    try{
        await db.assortment.updateOne({ _id: id }, { $set: updateObject})
        const updatedAssortment = await db.assortment.findOne({ _id: id })
        res.status(200).send({ assortment: updatedAssortment })
    }catch(error){
        res.status(500).send({ message: error.message });
    }
})

//Deletes assortment on type
router.delete("/api/editassortment/:id", async (req, res) => {
    const id = new ObjectId(req.params.id)
    try{
        await db.assortment.deleteOne({ _id: id })
        res.status(200).send({ message: "deleted" })
    }catch(error){
        res.status(500).send({ message: error.message });
    }
})

export default router;