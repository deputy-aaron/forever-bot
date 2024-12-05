const { ApplicationCommandOptionType, Events, ModalBuilder, TextInputBuilder, TextInputStyle,PermissionOverwrites,PermissionOverwriteManager,PermissionOverwriteOptions, Client, ChannelType,PermissionsBitField, Interaction, PermissionFlagsBits, ComponentType, EmbedBuilder, ButtonBuilder, ButtonStyle, ButtonComponent, ActionRowBuilder } = require('discord.js');
const blacklistSchema = require('../../models/Blacklist');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    
    const data = await blacklistSchema.find({ guildId: interaction.guild.id})

    if (!data) {
    const embed = new EmbedBuilder()
    .setTitle(`Modmail Blacklists`)
    .setDescription(`Here are a list of this server's blacklists from the Modmail system.`)

    

    data.forEach((Blacklist) => {

      const formattedCaseId = `\`${Blacklist.caseId}\``

      embed.addFields(
        { name: `**Case ID:** ${formattedCaseId}`, value: `**Member:** ${Blacklist.userId}\n**Staff Member** ${Blacklist.staffId}\n**Reason:** ${Blacklist.reason}`}
      )
    })

    interaction.reply({ embeds: [embed], ephemeral: true})
  }

  if (data) {
    const embed = new EmbedBuilder()
    .setTitle(`Modmail Blacklists`)
    .setDescription("Here are a list of this server's blacklists from the Modmail system.\n\n```I couldn't find any blacklists for this server.```")

    interaction.reply({ embeds: [embed], ephemeral: true})
  }
  },
  name: 'blacklists',
    description: 'View the blacklists of the mail system.',
    options: [],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
};
