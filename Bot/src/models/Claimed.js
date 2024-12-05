const { model, Schema } = require('mongoose')

let claimedSchema = new Schema({
    Guild: String,
    User: String,
})

module.exports = model("claimedSchema", claimedSchema)