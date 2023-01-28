import makeApp from "./server.js"
import dotenv from "dotenv"
import mainDAO from "./dao/mainDAO.js"
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

// initialise express app with database
const app = makeApp(mainDAO)

// start web server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});