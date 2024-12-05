const { model, Schema } = require("mongoose");

let schema = new Schema({
    Guild: {
    type:  String,
    required: true,
    },
    Channel: {
    type:   String,
    required: true,
    },
    LogLevel: {
    type: String,
    required: false,
    },
  });

module.exports = model("audit_log", schema);
