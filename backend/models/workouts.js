import mongoose from "mongoose"

/**
 * This object defines the schema for an Workout.
 */
const schema = new mongoose.Schema({
    date: {type: Date, default: Date.now}
})

const model = mongoose.model("Workout",
                             schema,
                             "workouts")

export default model