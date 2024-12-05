const { model, Schema } = require('mongoose')

let modSchema = new Schema({
    Guild: String,
    User: String,
    Staff: String,
})

module.exports = model("modSchema", modSchema)