import express from "express";
const app = express();

app.use(express.json())

import path from "path"
import dotenv from "dotenv"
dotenv.config()


import rateLimit from "express-rate-limit"
//Limiter det gør at der kun må blive sendt et hvis antal request pr. 10 minut
const generalLimiter = rateLimit({  
  windowMs: 10 * 60 * 1000,
  max: 80
})

//Resolves the folder
app.use(express.static(path.resolve("../client/dist")))

import session from "express-session"
//måske skal der bruges cookie.path som gør specificerer hvornår man får tildelt en cookie
const maxAgeTime = 1000 * 60 * 60
const sessionName = "cookiename"

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  //Dette spørger om appen kører på https, så hvis den er true = https og false = http
  cookie: {
    name: sessionName,
    secure: false,
    maxAge: maxAgeTime
  }
}))

import cors from "cors"
app.use(cors())


app.use(express.urlencoded({
  extended: true
}))

app.use(express.json());

const PORT = process.env.PORT || 8080;

//Routers
// import forgotpasswordrouter from "./routers/forgotPasswordRouter.js"
// app.use(forgotpasswordrouter)

import authRouter from "./routers/authRouter.js"
app.use(authRouter);

import residentRouter from "./routers/residentRouter.js"
app.use(residentRouter);

import assortmentRouter from "./routers/assortmentRouter.js"
app.use(assortmentRouter);

import taskRouter from "./routers/taskRouter.js"
app.use(taskRouter)

//Middleware
const redirectLogin = (req, res, next) => {
  if (!req.session.role) {
    console.log("jeg er ikke i session")
    res.redirect("/login")
  } else {
    next()
  }
}

const redirectHome = (req, res, next) => {
  if (req.session.role) {
    res.redirect("/home")
  } else {
    next()
  }
}

const onlyAdmin = (req, res, next) => {
  if (req.session.role !== "ADMIN") {
    res.redirect("/home")
  } else {
    next()
  }
}

//api created to fetch the role on svelte
app.get("/api/isadmin", (req, res) => {
  if (req.session.role === "ADMIN") {
    res.send({ role: "ADMIN" })
  } else if (req.session.role === "USER") {
    res.send({ role: "USER" })
  } else {
    res.send({ role: "NOT LOGGED IN" })
  }
})

app.get("/api/user", (req, res) => {
  const name = req.session.name
  res.send({name:name})
})

//Restriction for endpoint roles
app.use("/home", generalLimiter, redirectLogin);
app.use("/admin", generalLimiter, onlyAdmin);
app.use("/login", generalLimiter, redirectHome);
app.use("/signup", generalLimiter, redirectHome);
app.use("/forgotpassword", generalLimiter);
app.use("/editassortment", generalLimiter, onlyAdmin)
app.use("/editresident", generalLimiter, onlyAdmin)


//Logout to destroy session, so that you can login again
app.get("/logout", (req, res, next) => {
  req.session.destroy();
  console.log("Session detroyed")
  res.redirect("/login")
})

//fs is used to read the index.html file in dist folder as a toString, which allows us to use the Router endpoints from svelte
import fs from "fs"
const page = fs.readFileSync("../client/dist/index.html").toString()
app.get(['/home', "/admin", "/login", "/signup", "/forgotpassword", "/residents/:room", "/editassortment", "/editresident"], (req, res) => {
  res.send(page)
});

app.get(("/*"), (req, res) => {
  res.send("<h1>404 page not found</h1>")
});

const server = app.listen(PORT, (error) => {
  if (error) {
    console.log(error)
  }
  console.log("Server is running on port", server.address().port)
})