import express from 'express'
import ExercisesController from "./controllers/exercises.js"
import WorkoutsController from "./controllers/workouts.js"
import SetsController from "./controllers/sets.js"

const router = express.Router()

// set up routes
router.route('/exercises').get(ExercisesController.apiGetExercises)
                          .post(ExercisesController.apiPostExercise)
                          .delete(ExercisesController.apiDeleteExercise)
                          .put(ExercisesController.apiUpdateExercise)

router.route('/workouts').post(WorkoutsController.apiPostWorkout)
                         .get(WorkoutsController.apiGetWorkouts)
                         .delete(WorkoutsController.apiDeleteWorkout)

router.route('/sets').post(SetsController.apiPostSet)
                     .get(SetsController.apiGetSets)
                     .delete(SetsController.apiDeleteSet)
export default router