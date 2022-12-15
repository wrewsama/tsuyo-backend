import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ExercisesDAO from "./dao/exercisesDAO.js"
import mongoose from 'mongoose'

// load in environment vars
dotenv.config()

const port = process.env.PORT || 8000

// connect to DB
const uri = process.env.TSUYO_DB_URI
mongoose.connect(uri)
mongoose.set('strictQuery', false)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

// start web server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});