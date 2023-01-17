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

    res.send([{ bills: { summedBills: Number(billSum) } }])
})

router.patch("/api/bills", async (req, res) => {
    if(!req.session.role){
        res.status(401).send({message: "not session"})
    }else{
    const getResident = await db.residents.find({}).toArray();
    const bill = {bill: 0}
    try{
        getResident.forEach(resident => {
        db.residents.updateOne({room: resident.room}, {$set: bill})
    })
    const updatedBills = await db.residents.find({}).toArray()
        res.status(200).send({bills: updatedBills})
    }catch(error){
        res.status(500).send({error})
    }}
})


export default router;
