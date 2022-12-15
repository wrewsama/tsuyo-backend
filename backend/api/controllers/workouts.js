import WorkoutsDAO from "../../dao/workoutsDAO.js"

export default class WorkoutsController {
    static async apiPostWorkout(req, res, next) {
        try {
            const date = req.body.date
            const response = await WorkoutsDAO.addWorkout(date)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetWorkouts(req, res, next) {
        const response = await WorkoutsDAO.getWorkouts()

        res.json(response)
    }

    static async apiDeleteWorkout(req, res, next) {
        try {
            const workoutId = req.query.id
            const response = await WorkoutsDAO.deleteWorkout(workoutId)

            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}