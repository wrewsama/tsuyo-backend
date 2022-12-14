import express from "express"

// instantiate router
const router = express.Router()

// set up routes
router.route('/').get((req, res) => res.send("test"))

export default router