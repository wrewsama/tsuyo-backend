import express from 'express'
import ExercisesController from "./controllers/exercises.js"
import WorkoutsController from "./controllers/workouts.js"
import SetsController from "./controllers/sets.js"
import requireAuth from '../middleware/requireAuth.js'

/**
 * Creates a router that defines the API routes used by tsuyo.
 * 
 * @param {Class} exercisesDao Data Access Object for the exercises DB
 * @param {Class} workoutsDao Data Access Object for the workouts DB
 * @param {Class} setsDao Data Access Object for the sets DB
 * @returns router
 */
const makeRouter = (exercisesDao, workoutsDao, setsDao) => {
    const router = express.Router()

    // initialise controllers
    const exercisesController = ExercisesController(exercisesDao)
    const setsController = SetsController(setsDao)
    const workoutsController = WorkoutsController(workoutsDao)
    
    // set up authorisation middleware
    router.use(requireAuth)
    
    // Exercises routes
    router.route('/exercises').get(exercisesController.apiGetExercises)
                              .post(exercisesController.apiPostExercise)
                              .delete(exercisesController.apiDeleteExercise)
                              .put(exercisesController.apiUpdateExercise)
    
    router.route('/exercises/:id').get(exercisesController.apiGetExerciseById)
    
    // Workouts routes
    router.route('/workouts').post(workoutsController.apiPostWorkout)
                             .get(workoutsController.apiGetWorkouts)
                             .delete(workoutsController.apiDeleteWorkout)
    
    router.route('/workouts/:id').get(workoutsController.apiGetWorkoutById)
    
    // Sets routes
    router.route('/sets').post(setsController.apiPostSet)
                         .get(setsController.apiGetSets)
                         .delete(setsController.apiDeleteSet)
                         .put(setsController.apiUpdateSet)
    
    router.route('/sets/:eid').get(setsController.apiGetSetsByExerciseId)
    return router
}

export default makeRouter