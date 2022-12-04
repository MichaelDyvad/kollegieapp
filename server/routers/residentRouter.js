import db from "../database/connection.js";

import { Router } from "express";

const router = Router()

router.get("/api/residents", async (req, res) => {
    const getResidents = await db.residents.find({}).toArray();
    console.log(getResidents)
    res.send([{residents: getResidents}])
})

router.get("/api/residents/:room", async (req, res) => {
    const getResidents = await db.residents.find({room:Number(req.params.room)}).toArray();
    console.log(getResidents)
    res.send([{resident: getResidents}])
})

export default router;