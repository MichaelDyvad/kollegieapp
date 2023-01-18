import express from "express";
import session from "express-session"

import http from "http";
import { Server } from "socket.io";

import path from "path"
import dotenv from "dotenv"

const app = express();
const server = http.createServer(app);
const io = new Server(server);

import cors from "cors"
app.use(cors())
app.use(express.urlencoded({extended: true}))
dotenv.config()
app.use(express.json())

//Resolves the folder
app.use(express.static(path.resolve("../client/dist")))

import rateLimit from "express-rate-limit"
//Limiter limits the request pr. 10 minut
const generalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 80
})


const maxAgeTime = 1000 * 60 * 60


const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: maxAgeTime
  }
})

app.use(sessionMiddleware)

//Routers
import authRouter from "./routers/authRouter.js"
app.use(authRouter);

import residentRouter from "./routers/residentRouter.js"
app.use(residentRouter);

import assortmentRouter from "./routers/assortmentRouter.js"
app.use(assortmentRouter);

import taskRouter from "./routers/taskRouter.js"
app.use(taskRouter);

import editResidentRouter from "./routers/editResidentRouter.js"
app.use(editResidentRouter);

import editAssortmentRouter from "./routers/editAssortmentRouter.js"
app.use(editAssortmentRouter);

import adminRouter from "./routers/adminRouter.js"
app.use(adminRouter);

import laundryRouter from "./routers/laundryRouter.js"
app.use(laundryRouter);

import logicRouter from "./routers/logicRouter.js"
app.use(logicRouter);

//Middleware
const redirectLogin = (req, res, next) => {
  if (!req.session.role) {
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

//Restriction for endpoint roles
app.use("/home", generalLimiter, redirectLogin);
app.use("/tasks", generalLimiter, redirectLogin);
app.use("/admin", generalLimiter, onlyAdmin);
app.use("/login", generalLimiter, redirectHome);
app.use("/signup", generalLimiter, redirectHome);
app.use("/forgotpassword", generalLimiter);
app.use("/editassortment", generalLimiter, onlyAdmin);
app.use("/editresident", generalLimiter, onlyAdmin);

//Logout to destroy session, so that you can login again
app.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/login")
})

//fs is used to read the index.html file in dist folder as a toString, which allows us to use the Router endpoints from svelte
import fs from "fs"
const page = fs.readFileSync("../client/dist/index.html").toString()
app.get(["/residents/:room", "/home", "/tasks", "/laundry", "/admin", "/login", "/signup", "/editassortment", "/editresident", "/forgotpassword"], (req, res) => {
  res.send(page)
});

//Default all other routes that is not permitted
app.get(("/*"), (req, res) => {
  res.send("<h1>404 page not found</h1>")
});

let activeUsers = 0;

io.on('connection', (socket) => {
    activeUsers++;
    socket.on("disconnect", () => {
        activeUsers--;
    });
    io.emit("users-connected", { message: activeUsers });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port", PORT))