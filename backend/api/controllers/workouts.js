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
}