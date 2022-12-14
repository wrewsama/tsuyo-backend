import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

// load in environment vars
dotenv.config()

// instantiate mongoclient
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

// connect to DB
MongoClient.connect(
    process.env.TSUYO_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    // start the web server
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})