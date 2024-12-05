const Moderation = require('../../models/Moderation');
const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require('discord.js');

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result;
}

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {

    const channel = interaction.options.getChannel('channel') || interaction.channel;

    // Check if the user has permission to manage channels
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return interaction.reply({ content: 'You do not have permission to use this command. [PermissionsBitField.Flags.ManageChannels]', ephemeral: true });
    }

    // Check if the channel is already unlocked
    if (channel.permissionsFor(interaction.guild.roles.everyone).has(PermissionsBitField.Flags.SendMessages) === true) {
      return interaction.reply({ content: 'This channel is already unlocked.', ephemeral: true });
    }

    // Unlock the channel
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: null
    });

    // Send an embed to confirm that the channel has been unlocked
    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setTitle(`\`\`\`The channel has been unlocked.\`\`\``).setDescription(`Channel Name: ${channel}`)
      .setTimestamp()

    await interaction.reply({ ephemeral: true, embeds: [embed] });

  },

  name: 'unlock',
  description: 'Unlock a channel.',
  options: [
    {
      name: 'channel',
      description: 'The channel to unlock.',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageChannels],
};
