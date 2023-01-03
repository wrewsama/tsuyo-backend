import WorkoutsDAO from "../../dao/workoutsDAO.js"

/**
 * Handles the API requests to the /workouts route.
 */
export default class WorkoutsController {
    /**
     * Adds a workout to the database.
     */
    static async apiPostWorkout(req, res, next) {
        try {
            const date = req.body.date
            const response = await WorkoutsDAO.addWorkout(date)

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
    static async apiGetWorkouts(req, res, next) {
        const response = await WorkoutsDAO.getWorkouts()

        res.json(response)
    }

    /**
     * Gets the Workout with the given id.
     * 
     * Takes the id from the url's params and sends the corresponding Workout
     * document in the response.
     */
    static async apiGetWorkoutById(req, res, next) {
        try {
            let id = req.params.id || {}
            let workout = await WorkoutsDAO.getWorkoutById(id)

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
    static async apiDeleteWorkout(req, res, next) {
        try {
            const workoutId = req.query.id
            const response = await WorkoutsDAO.deleteWorkout(workoutId)

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