import db from "../database/connection.js";
import bcrypt from "bcrypt";

import { Router } from "express";
const router = Router()

//Edit the whole entity of the resident
router.patch("/api/editresident/:room", async (req, res) => {
    if (!req.session.role) {
        res.status(401).send({ message: "not session" })
    } else {
        const room = Number(req.params.room)
        const updateObject = req.body
        try {
            if ("password" in updateObject) {
                const hashPassword = await bcrypt.hash(updateObject.password, 10);
                updateObject.password = hashPassword

                await db.residents.updateOne({ room: room }, { $set: updateObject })

                const updatedResident = await db.residents.findOne({ room: room })
                res.status(200).send({ resident: updatedResident })
            } else {
                await db.residents.updateOne({ room: room }, { $set: updateObject })

                const updatedResident = await db.residents.findOne({ room: room })
                res.status(200).send({ resident: updatedResident })
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
})

//Delets resident on room
router.delete("/api/editresident/:room", async (req, res) => {
    if (!req.session.role) {
        res.status(401).send({ message: "not session" })
    } else {
        const room = Number(req.params.room)
        try {
            await db.residents.deleteOne({ room: room })
            res.status(200).send({})
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
})

export default router;