const { model, Schema } = require('mongoose')

let staffSchema = new Schema({
    userId: {
        type: String,
        required: true,
      },
    guildId: {
        type: String,
        required: true,
      },
    bans: {
        type: Number,
        required: true,
        default: 0,
    },
    kicks: {
        type: Number,
        required: true,
        default: 0,
    },
    warns: {
        type: Number,
        required: true,
        default: 0,
    },
    timeouts: {
        type: Number,
        required: true,
        default: 0,
    },
    joined: {
        type: String,
        required: true,
    }
})

module.exports = model("staffSchema", staffSchema)