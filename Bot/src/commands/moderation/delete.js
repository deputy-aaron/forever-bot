const Moderation = require('../../models/Moderation');
const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {

    const caseIdToDelete = interaction.options.get('case-id').value;
    
    Moderation.findOneAndDelete({ caseId: caseIdToDelete }) // Find and delete by caseId
  .then((deletedRecord) => {
    if (deletedRecord) {
      console.log('Warning deleted successfully:', deletedRecord);
      // Provide feedback to the user that the warning was deleted
    } else {
      console.log('Warning with the provided caseId not found.');
      // Provide feedback that the warning was not found
    }
  })
  .catch((error) => {
    console.error('Error deleting warning:', error);
    // Handle any errors that occur during the deletion process
  });

  },

  name: 'delete',
  description: `Delete a member's moderation.`,
  options: [
    {
      name: 'case-id',
      description: 'Case ID of the moderation you wish to delete.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
};