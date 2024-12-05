const { ApplicationCommandOptionType, Events, ModalBuilder, TextInputBuilder, TextInputStyle,PermissionOverwrites,PermissionOverwriteManager,PermissionOverwriteOptions, Client, ChannelType,PermissionsBitField, Interaction, PermissionFlagsBits, ComponentType, EmbedBuilder, ButtonBuilder, ButtonStyle, ButtonComponent, ActionRowBuilder } = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true, ManageChannels: true });
    interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.get("1246585623452713030"), { SendMessages: false, ManageChannels: false, ViewChannel: true });
    interaction.channel.permissionOverwrites.edit(interaction.user.id, { SendMessages: true, ManageChannels: true });

    interaction.reply({content: 'Succesfully claimed ticket!', ephemeral: true})
  },
  name: 'claim',
    description: 'Use this to claim the ticket.',
    options: [],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
};
