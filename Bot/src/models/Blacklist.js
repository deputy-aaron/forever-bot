const { Schema, model } = require('mongoose');

const blacklistSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  staffId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  caseId: {
    type: String,
    required: true,
  }
});

module.exports = model('blacklistSchema', blacklistSchema);
