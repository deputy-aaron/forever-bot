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
    .setTitle('Frequently Asked Questions')
    .setColor(0x2b2d31)
    .setDescription('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n```APPLICATION QUESTIONS:```\n**Q:** How often do applications get read?\n**A:** It depends, but if you have waited longer than 24h make a support ticket in <#1247932407374549012>.\n\n**Q:** What is the highest rank I can apply for?\n**A:** Junior Moderator.\n\n```DEPARTMENTS:```\n\n**Q:** How do I join a Department?\n**A:** It varies for most departments but you can expect to either go through a training or application.\n\n**Q:** Can I buy a rank in a department?\n**A:** No, the only way to join a department is through the department training process made by the department leadership.\n\n```STAFF QUESTIONS:```\n\n**Q:** A staff member just abused me, what can I do about this?\n**A:** If you have seen a staff member abusing and have proof contact Internal Affairs through the /report or open a ticket.\n\n**Q:** Can I go straight to high ranking position if I have a resume.\n**A:** Most of the time no, however if we are specifically mass recruiting HRs it is possible.')
    .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
    .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953205699809310/Frequent_Questions_1.png?ex=667f0112&is=667daf92&hm=0f949916189a1db758dae096bb406db6f7babb6863c1476715d6be19b292bb46&=&format=webp&quality=lossless&width=1157&height=305')
    .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});
    
    await interaction.channel.send({embeds: [embed]})

    interaction.reply({content: 'Sent embed!', ephemeral: true})
  },

  name: 'faq',
  description: 'Send a embed.',
  options: [],
  permissionsRequired: [PermissionFlagsBits.Administrator],
};