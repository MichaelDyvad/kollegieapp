import db from "../database/connection.js";

import { Router } from "express";
//Database imports
//Password encryptions
import bcrypt from "bcrypt"
const router = Router()

//const { insertedId } = await db.residents.insertOne({ name: "Freja", room: 603}); 

//console.log(insertedId);

//Create a user with the role "USER".
router.post("/signup", async (req, res) => {
    const name = req.body.residentname
    const email = req.body.email
    const room = req.body.room
    const bill = 0
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const role = "USER"

    let nameExist = await db.residents.find({name:name}).toArray()

    if(nameExist != 0){
      console.log("Already exist")
      res.redirect("/signup")
    }else{
      db.residents.insertOne({name: name, email:email, password:hashedPassword, room:room, bill:bill, role: role})
      req.session.role = role
      req.session.name = name
      res.redirect("/admin")
    }
  })

  router.post("/login", async (req, res) => {
    const name = req.body.residentname
    const password = req.body.password

    const dbName = await db.residents.find({name:name}).toArray()

    const hashedPassword = dbName[0].password
    try{
      if (await bcrypt.compare(password, hashedPassword)) {
        const sessionUserRole = dbName[0].role
        req.session.role = sessionUserRole
        req.session.name = name
        res.redirect("/admin")
      }
    }catch (error){
      console.log(error)
      res.redirect("/login")
    }
    
    
  })

export default router;