import express from 'express'
import ExercisesController from "./controllers/exercises.js"
import WorkoutsController from "./controllers/workouts.js"

const router = express.Router()

// set up routes
router.route('/exercises').get(ExercisesController.apiGetExercises)
                          .post(ExercisesController.apiPostExercise)
                          .delete(ExercisesController.apiDeleteExercise)
                          .put(ExercisesController.apiUpdateExercise)

router.route('/workouts').post(WorkoutsController.apiPostWorkout)

export default router