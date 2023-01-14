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

export default router;