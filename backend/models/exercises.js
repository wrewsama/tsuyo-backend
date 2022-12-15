import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: String,
    desc: String
})

const model = mongoose.model("Exercise",
                             schema,
                             "exercises")

export default model