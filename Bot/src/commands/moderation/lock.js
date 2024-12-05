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

    // Check if the channel is already locked
    if (channel.permissionsFor(interaction.guild.roles.everyone).has(PermissionsBitField.Flags.SendMessages) === false) {
      return interaction.reply({ content: 'This channel is already locked.', ephemeral: true });
    }

    // Lock the channel
    await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
        SendMessages: false
    });

    // Send an embed to confirm that the channel has been locked
    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setTitle(`\`\`\`The channel has been locked.\`\`\``)
      .setDescription(`Channel Name: ${channel}`)
      .setTimestamp()

    await interaction.reply({ ephemeral: true, embeds: [embed] });

  },

  name: 'lock',
  description: 'Lock a channel.',
  options: [
    {
      name: 'channel',
      description: 'The channel to lock.',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageChannels],
};
