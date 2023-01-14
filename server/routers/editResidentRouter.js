import db from "../database/connection.js";

import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router()

//Edit the whole entity of the resident
router.patch("/editresident/:room", async (req, res) => {
    const updateObject = req.body
    const keyOfReq = Object.keys(req.body)
    const valueOfReq = Object.values(req.body)
    if(keyOfReq[0] === 'password'){
        const password = await bcrypt.hash(valueOfReq[0], 10);
        await db.residents.updateOne(
            { room: Number(req.params.room) },
            {
                $set: {password: password}
            })
    }else{
        await db.residents.updateOne(
            { room: Number(req.params.room) },
            {
                $set: updateObject
            })
    }
    res.redirect("/editresident")
})

//Delets resident on room
router.delete("/editresident/:room", async (req, res) => {
    await db.residents.deleteOne({room: Number(req.params.room)})
    res.redirect("/editresident")
})

export default router;