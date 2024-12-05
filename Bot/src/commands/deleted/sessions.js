const { ApplicationCommandOptionType, Events, ModalBuilder, TextInputBuilder, TextInputStyle,PermissionOverwrites,PermissionOverwriteManager,PermissionOverwriteOptions, Client, ChannelType,PermissionsBitField, Interaction, PermissionFlagsBits, ComponentType, EmbedBuilder, ButtonBuilder, ButtonStyle, ButtonComponent, ActionRowBuilder, RoleSelectMenuBuilder } = require('discord.js');
const AutoRole = require('../../models/AutoRole');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const embed = new EmbedBuilder()
    .setTitle('Ottawa Sessions')
    .setColor(0x2b2d31)
    .setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\nSessions are when we launch our ER:LC roleplay server with staff active. Sessions are the only times when our server is guaranteed to have staff members in-game, while you will not receive moderation for being in-game when there isn't a session, it's not recommended.\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n")
    .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
    .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953205699809310/Frequent_Questions_1.png?ex=667f0112&is=667daf92&hm=0f949916189a1db758dae096bb406db6f7babb6863c1476715d6be19b292bb46&=&format=webp&quality=lossless&width=1157&height=305')
    .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});
    
    await interaction.channel.send({embeds: [embed]})
    
  },

  name: 'sessions',
  description: 'Send a embed.',
  options: [],
  permissionsRequired: [PermissionFlagsBits.Administrator],
};