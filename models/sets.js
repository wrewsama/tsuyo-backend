import mongoose from "mongoose"

/**
 * This object defines the schema for an Set.
 */
const schema = new mongoose.Schema({
    workoutId: mongoose.SchemaTypes.ObjectId,
    exerciseId: mongoose.SchemaTypes.ObjectId,
    weight: Number,
    reps: Number
})

const model = mongoose.model("Set",
                             schema,
                             "sets")

export default model