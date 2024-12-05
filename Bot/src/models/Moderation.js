const { Schema, model } = require('mongoose');

const modSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  moderator: {
    type: String,
    required: true,
  },
  caseId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    reqired: true,
  },
  reason: {
    type: String,
    reqired: true,
  },
});

module.exports = model('Moderation', modSchema);
