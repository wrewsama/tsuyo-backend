import express from 'express'
import ExercisesController from "./controllers/exercises.js"

const router = express.Router()

// set up routes
router.route('/').get(ExercisesController.apiGetExercises)
                 .post(ExercisesController.apiPostExercise)
                 .delete(ExercisesController.apiDeleteExercise)

export default router