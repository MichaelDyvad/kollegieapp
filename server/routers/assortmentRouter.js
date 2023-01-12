import db from "../database/connection.js";

import Router from "express";

const router = Router();

router.get("/api/assortment", async (req, res) => {
    const getAssortment = await db.assortment.find({}).toArray()
    res.send([{ assortment: getAssortment }])
})

router.get("/api/assortment/:type", async (req, res) => {
    const getAssortment = await db.assortment.find({type: req.params.type}).toArray()
    res.send([{ assortment: getAssortment }])
})

//Edit assortment
router.patch("/editassortment/:type", async (req, res) => {
    console.log(req.params.type)
    const type = req.body.type
    const price = req.body.price
    await db.assortment.updateOne({ type: req.params.type }, { $set: { type: type, price: Number(price) } })
    res.redirect("/editassortment")
})

router.post("/editassortment", async (req, res) => {
    const addAssortmentType = req.body.addassortmenttype
    const addAssortmentPrice = req.body.addassortmentprice

    await db.assortment.insertOne({ type: addAssortmentType, price: addAssortmentPrice })
    res.redirect("/editassortment")
})

//Delets resident on room
router.delete("/editassortment/:type", async (req, res) => {
    await db.assortment.deleteOne({ type: req.params.type })
    res.redirect("/editassortment")
})

export default router;