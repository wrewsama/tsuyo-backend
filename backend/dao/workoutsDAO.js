import Workout from "../models/workouts.js"
import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

export default class WorkoutsDAO {
    static async addWorkout(date) {
        try {
            const newWorkout = new Workout({
                date: date
            })

            await newWorkout.save()
            return { status: "success" }
        } catch(e) {
            console.error(`Unable to add workout ${e}`)
            return { error: e }
        }
    }
}