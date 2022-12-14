import express from 'express'
import ExercisesController from "./controllers/exercises.js"

const router = express.Router()

// set up routes
router.route('/').get(ExercisesController.apiGetExercises)
                 .post(ExercisesController.apiPostExercise)
                 .delete(ExercisesController.apiDeleteExercise)
                 .put(ExercisesController.apiUpdateExercise)

export default router