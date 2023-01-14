import db from "../database/connection.js";

import { Router } from "express";


const router = Router()

//Sum bills for api and overview for admin when payment is due
router.get("/api/bills", async (req, res) => {
    const getResident = await db.residents.find({}).toArray();

    let billSum = 0;
    getResident.forEach(resident => {
        billSum += Number(resident.bill)
    })
    res.send([{ bills: { summedBills: billSum } }])
})

router.patch("/api/bills", async (req, res) => {
    const getResident = await db.residents.find({}).toArray();
    getResident.forEach(resident => {
        db.residents.updateOne({room: resident.room}, {$set: {bill: 0}})
    })
    res.redirect("/admin")
})


export default router;
