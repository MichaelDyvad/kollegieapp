import db from "../database/connection.js";

import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router()
//Makes new array to define which keys the api will have
router.get("/api/residents", async (req, res) => {
    const getResidents = await db.residents.find({}).toArray();
    let residentArray = []
    getResidents.forEach((resident) => {
        residentArray.push({id: resident._id, name: resident.name, email: resident.email, room: resident.room, bill: resident.bill, role: resident.role})
    })
    res.send([{ residents: residentArray }])
})

router.get("/api/residents/:room", async (req, res) => {
    const getResident = await db.residents.find({ room: Number(req.params.room) }).toArray();
    const residentModified = {id: getResident[0]._id, name: getResident[0].name, email : getResident[0].email, room: getResident[0].room, bill: getResident[0].bill, role: getResident[0].role}
    res.send([{ resident: residentModified }])
})

//Increment bill on resident on room
router.post("/residents/:room", async (req, res) => {
    const room = Number(req.params.room)
    const getResident = await db.residents.find({ room: Number(req.params.room) }).toArray();
    const options = req.body
    const optionValue = Object.values(options)

    const currentResidentBill = getResident[0].bill
    const incrementBill = Number((currentResidentBill)) + (Number(optionValue))

    await db.residents.updateOne({ room: room }, 
        { 
            $set: { bill: incrementBill } 
        });

    res.redirect("/residents/" + room)

})

//Edit the whole entity of the resident
router.post("/editresident", async (req, res) => {
    const room = req.body.roomnumber
    const updateName = req.body.residentname
    const updateEmail = req.body.residentemail
    const updatePassword = await bcrypt.hash(req.body.residentpassword, 10)
    const updateBill = req.body.residentbill
    const updateRole = req.body.residentrole

    await db.residents.updateOne(
        { room: Number(room) },
        {
            $set: { name: updateName, email: updateEmail, password: updatePassword, bill: updateBill, role: updateRole }
        })

    res.redirect("editresident")
})

//Sum bills for api and overview for admin when payment is due
router.get("/api/bills", async (req, res) => {
    const getResident = await db.residents.find({}).toArray();

    let billSum = 0;
    getResident.forEach(resident => {
        billSum += Number(resident.bill)
    })
    res.send([{ bills: { summedBills: billSum } }])
})

router.delete("/editresident", async (req, res) => {
    const residentSelect = req.body.deleteresidentselect
    const resident = await db.residents.findByIdAndRemove({_id: Number(residentSelect)})
    console.log(resident)
})

export default router;