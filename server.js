import express from "express"
import cors from "cors"
import makeRouter from "./api/tsuyo.router.js"
import makeUserRouter from "./api/user.router.js"

const makeApp = (mainDao) => {
    // create express app
    const app = express()
    
    // set up middleware
    app.use(cors())
    app.use(express.json())
    
    // set up intiial routes
    app.use("/api/v1/tsuyo", makeRouter(
        mainDao.exercisesDAO,
        mainDao.workoutsDAO,
        mainDao.setsDAO))
    app.use("/api/v1/user", makeUserRouter(mainDao.setsDAO))
    app.use("*", (req, res) => res.status(404).json({ error: "not found" }))
    
    return app
}
export default makeApp