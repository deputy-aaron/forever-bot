const { Schema, model } = require('mongoose');
const evidence = require('../commands/moderation/evidence');

const evidenceSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  evidence: { 
    type: String,
    required: true,
  },
  caseId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  staff: {
    type: String,
    required: true
  }
});

module.exports = model('evidenceSchema', evidenceSchema);
