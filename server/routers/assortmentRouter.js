import db from "../database/connection.js";

import Router from "express";

const router = Router();

router.get("/api/assortment", async (req, res) => {
    const getAssortment = await db.assortment.find({}).toArray()
    res.send([{assortment: getAssortment}])
})

router.post("/editassortment", async (req, res) => {
    const assortmentOption = req.body.assortmentoption
    const editAssortmentType = req.body.editassortmenttype
    const editAssortmentPrice = req.body.editassortmentprice

    console.log(assortmentOption + editAssortmentType + editAssortmentPrice)

    await db.assortment.updateOne({type: assortmentOption}, {$set: {type: editAssortmentType, price: Number(editAssortmentPrice)}})
    res.redirect("/editassortment")
})

router.post("/editassortment"), async (req, res) => {
    const addAssortmentType = req.body.addassortmenttype
    const addAssortmentPrice = req.body.addassortmentprice

    await db.assortment.insertOne({type: addAssortmentType, price: addAssortmentPrice})
    res.redirect("/editassortment")
}

export default router;