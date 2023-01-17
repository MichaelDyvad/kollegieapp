import db from "../database/connection.js";
import bcrypt from "bcrypt";

import { Router } from "express";
const router = Router();

//Create a user with the role "USER".
router.post("/signup", async (req, res) => {
  const newUser = req.body
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.password = hashedPassword
  newUser.role = "USER"
  newUser.bill = 0
  newUser.room = Number(newUser.room)
  const role = "USER"

  let nameExist = await db.residents.find({ name: newUser.name }).toArray()
  if (nameExist != 0) {
    res.status(500).send({ message: "Signup failed" })
  } else {
    db.residents.insertOne(newUser)
    req.session.role = role
    req.session.name = newUser.name
    res.status(200).send({ message: "Signup success" })
  }
})

//Logs in the user if valid
router.post("/login", async (req, res) => {
  const user = req.body
  const dbName = await db.residents.find({ name: user.name }).toArray()
  try {
    const hashedPassword = dbName[0].password
    if (await bcrypt.compare(user.password, hashedPassword)) {
      const sessionUserRole = dbName[0].role
      req.session.role = sessionUserRole
      req.session.name = user.name
      res.status(200).send({ message: "Login success" })
    }
  } catch (error) {
    res.status(500).send({ message: "login failed" })
  }
})

export default router;