import mongoose from "mongoose"

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false}
}, {
    timestamps: true,
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise