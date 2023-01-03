import Set from '../models/sets.js'
import mongodb from 'mongodb'

const ObjectId = mongodb.ObjectId

/**
 * This class facilitates access to the data in the Sets collection.
 * 
 * It includes support for CRUD operations and getting all the sets with a
 * given  
 */
export default class SetDAO {
    /**
     * Adds a Set document to the Sets collection.
     * 
     * @param {String} workoutId The id of the workout this Set belongs to.
     * @param {String} exerciseId The id of the exercise this Set is for.
     * @param {Number} weight The weight used for this Set.
     * @param {Number} reps The number of repetitions performed for this Set.
     * @returns success and the set if the Set is successfully added
     *          error otherwise
     */
    static async addSet(workoutId, exerciseId, weight, reps) {
        try {
            const newSet = await Set.create({
                workoutId: workoutId,
                exerciseId: exerciseId,
                weight: weight,
                reps: reps
            })

            let set
            await newSet.save()
                .then(res => {
                    set = res
                })

            return { status: "success", set: set}
        } catch (e) {
            console.error(`Unable to add set ${e}`)
            return { error: e }
        }
    }

    /**
     * Gets all the Sets in the database.
     * 
     * @returns An array containing all the Set documents in the database.
     */
    static async getSets() {
        try {
            return await Set.find({})
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { error: e }
        }
    }

    /**
     * Gets all the Sets in the database belonging to a given exercise.
     * 
     * @param {String} exerciseId The id of the desired exercise.
     * @returns An array containing all the Set documents belonging to the
     *          given exercise.
     */
    static async getSetsByExerciseId(exerciseId) {
        try {
            const sets = await Set.find({ exerciseId: exerciseId })
            return { sets: sets }
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { error: e }
        }
    }

    /**
     * Deletes a Set document from the database.
     * 
     * @param {String} setId The id of the Set to be deleted.
     * @returns success if the Set is successfully deleted
     *          error otherwise
     */
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

    /**
     * Updates a Set document specified by a given id with the given weight
     * and reps.
     * 
     * @param {*} setId The id of the Set to be updated.
     * @param {*} weight The new weight of the Set.
     * @param {*} reps  The new number of reps for the Set.
     * @returns success if the Set is successfully updated
     *          error otherwise
     */
    static async updateSet(setId, weight, reps) {
        try {
            await Set.updateOne(
                {_id: ObjectId(setId)},
                {
                    $set: {
                        weight: weight,
                        reps: reps
                    }
                }
            )
            return { status: "success" }
        } catch (e) {
            console.error(`Unable to update set: ${e}`)
            return { error: e }
        }
    }
}