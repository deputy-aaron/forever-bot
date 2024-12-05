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

    const targetUserId = interaction.options.get('target-user').value;
    const targetUser = await interaction.guild.members.fetch(targetUserId);

    Moderation.find({ userId: `${targetUserId}` })
  .then((moderationRecords) => {
    if (moderationRecords.length > 0) {

      const embed = new EmbedBuilder()
        .setTitle('Moderation Records')
        .setColor(0x2b2d31)
        .setDescription(`Here are ${targetUser}'s moderations.`);

      moderationRecords.forEach((record) => {
        
        const formattedCaseId = `\`${record.caseId}\``
        
        embed.addFields(
        { name: `Case ID: ${formattedCaseId}`, value: `**Type:** ${record.type}\n**User:** ${targetUser}\n**Moderator:** ${record.moderator}\n**Reason:** ${record.reason}`, inline: false },
        );
      });

      // Send the embed to the channel or user
      interaction.channel.send({embeds: [embed]});
    } else {
      interaction.reply({ content: `No moderation records have been found for this user.`, ephemeral: true});
    }
  })
  .catch((error) => {
    console.error(`There was an error retrieving the moderation records: ${error}`);
  });

  },

  name: 'modlogs',
  description: `View a member's moderations.`,
  options: [
    {
      name: 'target-user',
      description: 'The user you want to warn.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
};
