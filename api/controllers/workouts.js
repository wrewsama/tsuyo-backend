/**
 * Handles the API requests to the /workouts route.
 */
export default class WorkoutsController {

    constructor(dao) {
        this.workoutsDao = dao
    }

    /**
     * Adds a workout to the database.
     */
    async apiPostWorkout(req, res, next) {
        try {
            const date = req.body.date
            const response = await this.workoutsDao.addWorkout(date)

            let { error } = response
            if (error) {
                res.status(400).json({ error })
            }

            res.json(response)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    /**
     * Gets all the workouts in the database.
     */
    async apiGetWorkouts(req, res, next) {
        const response = await this.workoutsDao.getWorkouts()

        res.json(response)
    }

    /**
     * Gets the Workout with the given id.
     * 
     * Takes the id from the url's params and sends the corresponding Workout
     * document in the response.
     */
    async apiGetWorkoutById(req, res, next) {
        try {
            let id = req.params.id || {}
            let workout = await this.workoutsDao.getWorkoutById(id)

            if (!workout) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(workout)
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    /**
     * Deletes a Workout from the database.
     * 
     * Gets the id from the url's query part and sends the corresponding
     * Workout document to the response.
     */
    async apiDeleteWorkout(req, res, next) {
        try {
            const workoutId = req.query.id
            const response = await this.workoutsDao.deleteWorkout(workoutId)

            let { error } = response
            if (error) {
                res.status(400).json({ error })
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}