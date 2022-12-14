import express from "express"
import cors from "cors"
import router from "./api/tsuyo.router.js"

// create express app
const app = express()

// apply middleware to express app
app.use(cors()) // cross origin resource sharing
app.use(express.json())

// specify initial route
app.use("/api/v1/tsuyo", router)

// return error 404 if any other route is used
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app