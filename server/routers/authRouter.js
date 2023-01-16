import db from "../database/connection.js";

import { Router } from "express";

import bcrypt from "bcrypt";
const router = Router();

//Create a user with the role "USER".
router.post("/signup", async (req, res) => {
    const newUser = req.body
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword
    newUser.role = "USER"
    const role = "USER"

    let nameExist = await db.residents.find({name: newUser.name}).toArray()
    if(nameExist != 0){
      res.redirect("/signup")
    }else{
      db.residents.insertOne(newUser)
      req.session.role = role
      req.session.name = newUser.name
      res.redirect("/admin")
    }
  })

  router.post("/login", async (req, res) => {
    const user = req.body
    const dbName = await db.residents.find({name: user.name}).toArray()
    try{
      const hashedPassword = dbName[0].password
      if (await bcrypt.compare(user.password, hashedPassword)) {
        const sessionUserRole = dbName[0].role
        req.session.role = sessionUserRole
        req.session.name = user.name
        res.redirect("/admin")
      }
    }catch (error){
      console.log(error)
      res.redirect("/login")
    }   
  })

export default router;