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

    interaction.channel.permissionOverwrites.edit(memberId, { ViewChannel: true });

    interaction.reply({content: `${member} has been added to this ticket.`, ephmeral: true})

    },
    name: 'add',
    description: 'Adds a member to a ticket.',
    options: [
      {
        name: 'target',
        description: 'The user you want to add to the ticket.',
        type: ApplicationCommandOptionType.Mentionable,
        required: true,
      },
    ], permissionsRequired: [PermissionFlagsBits.ManageChannels],
    }