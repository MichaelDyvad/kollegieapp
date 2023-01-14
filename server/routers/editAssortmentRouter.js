import db from "../database/connection.js";

import { Router } from "express";
const router = Router()

//Add to assortment
router.post("/editassortment", async (req, res) => {
    const addAssortmentType = req.body.addassortmenttype
    const addAssortmentPrice = req.body.addassortmentprice

    await db.assortment.insertOne({ type: addAssortmentType, price: addAssortmentPrice })
    res.redirect("/editassortment")
})

//Edit assortment
router.patch("/editassortment/:type", async (req, res) => {
    const updateObject = req.body
    console.log(updateObject)
    await db.assortment.updateOne({ type: req.params.type }, { $set: updateObject})
    res.redirect("/editassortment")
})

//Deletes assortment on type
router.delete("/editassortment/:type", async (req, res) => {
    await db.assortment.deleteOne({ type: req.params.type })
    res.redirect("/editassortment")
})

export default router;