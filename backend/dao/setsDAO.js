import Set from '../models/sets.js'
import mongodb from 'mongodb'

const ObjectId = mongodb.ObjectId

export default class SetDAO {
    static async addSet(workoutId, exerciseId, weight, reps) {
        try {
            const newSet = await Set.create({
                workoutId: workoutId,
                exerciseId: exerciseId,
                weight: weight,
                reps: reps
            })

            newSet.save()

            return { status: "success" }
        } catch (e) {
            console.error(`Unable to add set ${e}`)
            return { error: e }
        }
    }

    static async getSets() {
        try {
            return await Set.find({})
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { error: e }
        }
    }

    static async deleteSet(setId) {
        try {
            await Set.deleteOne({
                _id: ObjectId(setId)
            })
            return { status: "success" }
        } catch (e) {
            console.error(`Unable to delete set: ${e}`)
            return { error: e }
        }

    }
}