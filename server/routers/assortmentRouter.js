import db from "../database/connection.js";

import Router from "express";

const router = Router();

router.get("/api/assortment", async (req, res) => {
    const getAssortment = await db.assortment.find({}).toArray();
    console.log(getAssortment)
    res.send([{assortment: getAssortment}])
})


export default router;