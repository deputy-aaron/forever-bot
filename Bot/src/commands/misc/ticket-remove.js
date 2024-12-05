const { slashCommandBuilder, ApplicationCommandOptionType,PermissionFlagsBits, PermissionsBitField, EmbedBuilder, PermissionOverwrites } = require('discord.js');

module.exports = {
  /**
  *
  * @param {Client} client
  * @param {Interaction} interaction
  */
   
    callback: async (client, interaction) => {  
    
    const memberId = interaction.options.get('target').value;
    const member = await interaction.guild.members.fetch(memberId);

    interaction.channel.permissionOverwrites.edit(memberId, { ViewChannel: false });

    interaction.reply({content: `${member} has been removed from this ticket.`, ephmeral: true})

    },
    name: 'remove',
    description: 'Removes a member from a ticket.',
    options: [
      {
        name: 'target',
        description: 'The user you want to remove from the ticket.',
        type: ApplicationCommandOptionType.Mentionable,
        required: true,
      },
    ], permissionsRequired: [PermissionFlagsBits.ManageChannels],
    }