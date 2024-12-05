const { model, Schema } = require('mongoose')

let linkSchema = new Schema({
    guildId: {
        type: String,
        required: true,
      },
    userId: {
        type: String,
        required: true,
      },
    activations: {
        type: Number,
        required: true,
        default: 0,
      },
})

module.exports = model("linkSchema", linkSchema)