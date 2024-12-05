const { model, Schema } = require('mongoose')

let sessionSchema = new Schema({
    Session: String,
    Voter: String,
})

module.exports = model("sessionSchema", sessionSchema)