import db from "../database/connection.js";

import { Router } from "express";
const router = Router()

//Makes new array to define which keys the api will have
router.get("/api/residents", async (req, res) => {
    const getResidents = await db.residents.find({}).toArray();
    let residentArray = []
    getResidents.forEach((resident) => {
        residentArray.push({ id: resident._id, name: resident.name, email: resident.email, room: resident.room, bill: resident.bill, role: resident.role })
    })
    res.send([{ residents: residentArray }])
})

//Gets one resident on room
router.get("/api/residents/:room", async (req, res) => {
    const room = Number(req.params.room)
    const getResident = await db.residents.find({ room: room }).toArray();
    if(getResident != 0){
        const residentModified = [{ id: getResident[0]._id, name: getResident[0].name, email: getResident[0].email, room: getResident[0].room, bill: getResident[0].bill, role: getResident[0].role }]
        res.status(200).send([{ resident: residentModified }])
    }else{
        res.status(500).send({ message: "no user with that exist" })
    }
    
})

//Increment bill on resident on room
router.patch("/api/residents/:room", async (req, res) => {
    const room = Number(req.params.room)
    const getResident = await db.residents.find({ room: Number(req.params.room) }).toArray();
    const options = req.body
    const optionValue = Object.values(options)

    const currentResidentBill = getResident[0].bill
    const incrementBill = Number((currentResidentBill)) + (Number(optionValue))
    try {
        await db.residents.updateOne({ room: room }, { $set: { bill: incrementBill } });
        const updatedResident = await db.residents.findOne({ room: room })
        res.status(200).send({ resident: updatedResident })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

export default router;