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
    ExercisesController.init(exercisesDao)
    SetsController.init(setsDao)
    WorkoutsController.init(workoutsDao)
    
    // set up authorisation middleware
    router.use(requireAuth)
    
    // Exercises routes
    router.route('/exercises').get(ExercisesController.apiGetExercises)
                              .post(ExercisesController.apiPostExercise)
                              .delete(ExercisesController.apiDeleteExercise)
                              .put(ExercisesController.apiUpdateExercise)
    
    router.route('/exercises/:id').get(ExercisesController.apiGetExerciseById)
    
    // Workouts routes
    router.route('/workouts').post(WorkoutsController.apiPostWorkout)
                             .get(WorkoutsController.apiGetWorkouts)
                             .delete(WorkoutsController.apiDeleteWorkout)
    
    router.route('/workouts/:id').get(WorkoutsController.apiGetWorkoutById)
    
    // Sets routes
    router.route('/sets').post(SetsController.apiPostSet)
                         .get(SetsController.apiGetSets)
                         .delete(SetsController.apiDeleteSet)
                         .put(SetsController.apiUpdateSet)
    
    router.route('/sets/:eid').get(SetsController.apiGetSetsByExerciseId)
    return router
}

export default makeRouter