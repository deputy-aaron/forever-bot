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
    .setTitle('Phonetic Alphabet')
    .setColor(0x2b2d31)
    .setDescription("Below is a list of the Phonetic Alphabet, it is useful when reading out letters over a VC.")
    .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953207033860096/Information.png?ex=668b8753&is=668a35d3&hm=d9a4e83ad83a13423c5678a3b6b394ec6584e4e7c1b26448adf172aa56de5711&=&format=webp&quality=lossless&width=1157&height=305')
    .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=668bcc32&is=668a7ab2&hm=5b661800ca88ceac93f4f7b177f6c00f877eeae42e565af20723365731d9cf86&=&format=webp&quality=lossless&width=625&height=625')
    .addFields(
      {name: `A to M`,value: 'Alpha - A\nBravo - B\nCharlie - C\nDelta - D\nEcho - E\nFoxtrot - F\nGolf - G\nHotel - H\nIndia - I\nJuliet - J\nKilo - K\nLima - L\nMike - M', inline: true },
      {name: `N to Z`, value: `November - N\nOscar - O\nPapa - P\nQuebec - Q\nRomeo - R\nSierra - S\nTango - T\nUniform - U\nVictor - V\nWhisky - W\nX-Ray - X\nYankee - Y\nZulu - Z`, inline: true}
    )
    .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});

    const alphabet = new EmbedBuilder()
    .setTitle('Police Codes')
    .setDescription("```RADIO CODES```\n**10-4:** Understood\n**10-7:** Out of service/off duty\n**10-8:** Going in service/on duty\n**10-9:** Repeat\n**10-11:** Roadside Check (Vehicle, Location, Tag Information) \n**10-17:** Enroute \n**10-20:** Location\n**10-23:** Arrived at Scene\n**10-28/10-29:** Person Check\n**10-31: **Crime\n**10-32:** Additional Units\n**10-50:** Crash\n**10-57:** Hit and Run\n**10-80:** Pursuit\n\n```RESPONSE CODES```\n** Code 2:** Urgent Call but respond without sirens or lights\n**  Code 3:**   Urgent call with full lights and sirens\n** Code 4:**   Scene over, no additional units needed.\n** Code 5:**   Priority Call respond Code 3 with guns drawn.")
    .setColor(0x2b2d31)
    .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953207033860096/Information.png?ex=668b8753&is=668a35d3&hm=d9a4e83ad83a13423c5678a3b6b394ec6584e4e7c1b26448adf172aa56de5711&=&format=webp&quality=lossless&width=1157&height=305')
    .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=668bcc32&is=668a7ab2&hm=5b661800ca88ceac93f4f7b177f6c00f877eeae42e565af20723365731d9cf86&=&format=webp&quality=lossless&width=625&height=625')
    .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});
  
    await interaction.channel.send({embeds: [alphabet]})
    await interaction.channel.send({embeds: [embed]})
    

    interaction.reply({content: 'Sent embed!', ephemeral: true})
  },

  name: 'police-info',
  description: 'Send a embed.',
  options: [],
  permissionsRequired: [PermissionFlagsBits.Administrator],
};