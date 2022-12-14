import express from 'express'

const router = express.Router()

// set up routes
router.route('/').get((req, res) => res.send('hello'))

export default router