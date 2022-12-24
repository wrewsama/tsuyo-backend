import Workout from "../models/workouts.js"
import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

export default class WorkoutsDAO {
    static async addWorkout(date) {
        try {
            const newWorkout = new Workout({
                date: date
            })

            let id
            await newWorkout.save()
                .then(workout => {
                    id = workout._id
                })
            return { status: "success", id: id }
        } catch (e) {
            console.error(`Unable to add workout ${e}`)
            return { error: e }
        }
    }

    static async getWorkouts() {
        try {
            return await Workout.find({}).sort({date: 'desc'})
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { error: e }
        }
    }

    static async getWorkoutById(id) {
        try {
            const workout = await Workout.findById(id)
            return workout
        } catch(e) {
            console.error(`Unable to find workout ${e}`)
            return { error: e }
        }
    }

    static async deleteWorkout(workoutId) {
        try {
            await Workout.deleteOne({
                _id: ObjectId(workoutId)
            })
            return { status: "success" }
        } catch (e) {
            console.error(`Unable to delete workout: ${e}`)
            return { error: e }
        }

    }
}