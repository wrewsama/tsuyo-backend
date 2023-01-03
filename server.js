import express from "express"
import cors from "cors"
import router from "./api/tsuyo.router.js"
import userRouter from "./api/user.router.js"

// create express app
const app = express()

// set up middleware
app.use(cors())
app.use(express.json())

// set up intiial routes
app.use("/api/v1/tsuyo", router)
app.use("/api/v1/user", userRouter)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
