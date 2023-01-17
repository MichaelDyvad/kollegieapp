import { Router } from "express"
const router = Router();

//api created to fetch the role on svelte
router.get("/api/isadmin", (req, res) => {
    if (req.session.role === "ADMIN") {
        res.send({ role: "ADMIN" })
    } else if (req.session.role === "USER") {
        res.send({ role: "USER" })
    } else {
        res.send({ role: "NOT LOGGED IN" })
    }
})

router.get("/api/user", (req, res) => {
    const name = req.session.name
    res.send({ name: name })
})

export default router;