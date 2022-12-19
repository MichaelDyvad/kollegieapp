import db from "../database/connection.js";

import { Router } from "express";

const router = Router()

router.get("/api/residents", async (req, res) => {
    const getResidents = await db.residents.find({}).toArray();
    res.send([{residents: getResidents}])
})

router.get("/api/residents/:room", async (req, res) => {
    const getResident = await db.residents.find({room:Number(req.params.room)}).toArray();
    res.send([{resident: getResident}])
})

router.post("/residents/:room", async (req, res) => {
    const room = Number(req.params.room)
    const getResident = await db.residents.find({room: Number(req.params.room)}).toArray();
    const options = req.body
    const optionValue = Object.values(options)
    
    const currentResidentBill = getResident[0].bill
    console.log(currentResidentBill)
    const incrementBill = Number((currentResidentBill)) + (Number(optionValue))

    const addToBill = await db.residents.updateOne({room: room}, {$set: {bill: incrementBill}});
    res.redirect("/residents/" + room)
    
})

router.get("/api/bills", async (req, res) =>{
    const getResident = await db.residents.find({}).toArray();

    let billSum = 0;
    getResident.forEach(resident => {
        billSum += Number(resident.bill)
    })
    console.log(billSum)
    res.send({summedBills: billSum})
})

export default router;