import express from "express"
import cors from "cors"
import router from "./api/tsuyo.router.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/tsuyo", router)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app