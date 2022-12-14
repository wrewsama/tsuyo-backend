import express from 'express'
import ExercisesController from "./controllers/exercises.js"

const router = express.Router()

// set up routes
router.route('/').get((req, res) => res.send('hello'))

export default router