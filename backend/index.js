import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

// configure dotenv package
dotenv.config()

// instantiate mongoclient
const MongoClient = mongodb.MongoClient

// set port number
const port = process.env.PORT || 8000

// connect to DB
MongoClient.connect(
    process.env.TSUYO_DB_URI, // db uri
    {
        maxPoolSize: 50, // limit no of connections at every pt in time
        wtimeoutMS: 2500, // timeout in 2500 ms
        useNewUrlParser: true
    }
)
.catch(err => {
    // error handling
    console.error(err)
    process.exit(1)
})
.then(async client => {
    // start the web server
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})

