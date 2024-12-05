const { ApplicationCommandOptionType, Events, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle,PermissionOverwrites,PermissionOverwriteManager,PermissionOverwriteOptions, Client, ChannelType,PermissionsBitField, Interaction, PermissionFlagsBits, ComponentType, EmbedBuilder, ButtonBuilder, ButtonStyle, ButtonComponent, ActionRowBuilder, RoleSelectMenuBuilder } = require('discord.js');
const AutoRole = require('../../models/AutoRole');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {

        const embed = new EmbedBuilder()
          .setTitle('**Ottawa Tickets Dashboard**')
          .setColor(0x2b2d31)
          .setDescription('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n **`General Support:`**\n**·** General Concerns\n **·** Member Reports\n**·** Anything else not mentioned \n\n**`Internal Affairs:`**\n **·** Staff Reports\n**·** Punishment Appeals\n\n**`Directive Support:`**\n**·** Reporting High Ranks\n**·** Support relating to bots\n**·** Department Issues \n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**Please Note:**\n Abusing the support system can and will result in warnings being given.') 
          .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
          .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953205305675807/Ticket_System.png?ex=667f0112&is=667daf92&hm=a549ef1889d5a2576297c0c4b7dc483bdd43414354e4c88cbd0879e297f229e4&=&format=webp&quality=lossless&width=1157&height=305')

    const firstButton = new ButtonBuilder()
      .setLabel('General Support')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('first-button')
      .setEmoji('<:Other:1250126023618592808> ')
    
      const secondButton = new ButtonBuilder()
      .setLabel('Directive Support')
      .setStyle(ButtonStyle.Success)
      .setCustomId('second-button')
      .setEmoji('<:DirectiveTeam:1250125171449401366>  ')

      const thirdButton = new ButtonBuilder()
      .setLabel('Internal Affairs')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('third-button')
      .setEmoji('<:InternalAffairs:1250125545694433401> ')

    
      const buttRow = new ActionRowBuilder().addComponents(firstButton, secondButton, thirdButton);
    
      const reply = await interaction.channel.send({ embeds: [embed] ,content: '', components: [buttRow] });

      const collector = reply.createMessageComponentCollector({
        componentType: ComponentType.Button,
      });
    
      collector.on('collect', async (interaction) => {
        if (interaction.customId === 'first-button') {
          
          const member = interaction.user

          const channel = await interaction.guild.channels.create({
            name: `❓｜ticket-${interaction.user.tag}`,
            topic: `${interaction.user.id}`,
            type: ChannelType.GuildText,
            parent: '1250126344994558114',
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                allow: [PermissionsBitField.Flags.ManageChannels],
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
                deny: [PermissionsBitField.Flags.SendMessages],
              },
              {
                id: interaction.guild.roles.cache.get("1246586404507615323"),
                allow: [PermissionsBitField.Flags.ViewChannel][PermissionsBitField.Flags.SendMessages],
              },
              {
                id: interaction.guild.roles.cache.get("1246585623452713030"),
                allow: [PermissionsBitField.Flags.ViewChannel][PermissionsBitField.Flags.SendMessages],
              },
            ],
          });
        
          interaction.reply({content: `Your ticket is now open in ${channel}.`, ephemeral: true})

          await channel.send({content: `<@&1246586404507615323> | ${interaction.user}`})

          const embed = new EmbedBuilder()
          .setTitle('Ticket Successful!')
          .setColor(0x2b2d31)
          .setDescription(`Welcome to your ticket! Members of our support team have been notified, while you wait, please describe the issue.\n\n**Ticket Type:** General Support\n\n**Ticket Commands:**\n• /close | Closes the ticket.\n• /add | Adds a person to the ticket.\n• /remove | Removes a person from the ticket.\n\n**Please Note:**\nText in this channel will be recorded and transcribed for quality assurance and training purposes.`)
          .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
          .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953205305675807/Ticket_System.png?ex=667f0112&is=667daf92&hm=a549ef1889d5a2576297c0c4b7dc483bdd43414354e4c88cbd0879e297f229e4&=&format=webp&quality=lossless&width=1157&height=305')
          .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});

          await channel.send({embeds: [embed] })
          
        };
    
        if (interaction.customId === 'second-button') {
          const member = interaction.user

          const channel = await interaction.guild.channels.create({
            name: `❓｜ticket-${interaction.user.tag}`,
            topic: `${interaction.user.id}`,
            type: ChannelType.GuildText,
            parent: '1250126344994558114',
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                allow: [PermissionsBitField.Flags.ManageChannels],
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: interaction.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
                deny: [PermissionsBitField.Flags.SendMessages],
              },
              {
                id: interaction.guild.roles.cache.get("1246585623452713030"),
                allow: [PermissionsBitField.Flags.ViewChannel][PermissionsBitField.Flags.SendMessages],
              },
            ],
          });
        
          interaction.reply({content: `Your ticket is now open in ${channel}.`, ephemeral: true})

          await channel.send({content: `<@&1246585623452713030> | ${interaction.user}`})

          const embed = new EmbedBuilder()
          .setTitle('Ticket Successful!')
          .setColor(0x2b2d31)
          .setDescription(`Welcome to your ticket! Members of our support team have been notified, while you wait, please describe the issue.\n\n**Ticket Commands:**\n• /close | Closes the ticket.\n• /add | Adds a person to the ticket.\n• /remove | Removes a person from the ticket.\n\n**Please Note:**\nText in this channel will be recorded and transcribed for quality assurance and training purposes.`)
          .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
          .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953205305675807/Ticket_System.png?ex=667f0112&is=667daf92&hm=a549ef1889d5a2576297c0c4b7dc483bdd43414354e4c88cbd0879e297f229e4&=&format=webp&quality=lossless&width=1157&height=305')
          .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1248364231292616795/image_2024-05-23_165408198-removebg-preview.png?ex=6663654a&is=666213ca&hm=7e8092b25d9efdb2c2ad12b10b246e739732da54f1810c13265afca58a110ecc&=&format=webp&quality=lossless&width=306&height=337'});

          await channel.send({embeds: [embed] })
          };
          if (interaction.customId === 'third-button') {
          
            const member = interaction.user
  
            const channel = await interaction.guild.channels.create({
              name: `❓｜ticket-${interaction.user.tag}`,
              topic: `${interaction.user.id}`,
              type: ChannelType.GuildText,
              parent: '1250126344994558114',
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  allow: [PermissionsBitField.Flags.ManageChannels],
                  deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                  id: interaction.user.id,
                  allow: [PermissionsBitField.Flags.ViewChannel],
                  deny: [PermissionsBitField.Flags.SendMessages],
                },
                {
                  id: interaction.guild.roles.cache.get("1246586404507615323"),
                  allow: [PermissionsBitField.Flags.ViewChannel][PermissionsBitField.Flags.SendMessages],
                },
                {
                  id: interaction.guild.roles.cache.get("1246585623452713030"),
                  allow: [PermissionsBitField.Flags.ViewChannel][PermissionsBitField.Flags.SendMessages],
                },
              ],
            });
          
            interaction.reply({content: `Your ticket is now open in ${channel}.`, ephemeral: true})
  
            await channel.send({content: `<@&1246586404507615323> | ${interaction.user}`})
  
            const embed = new EmbedBuilder()
            .setTitle('Ticket Successful!')
            .setColor(0x2b2d31)
            .setDescription(`Welcome to your ticket! Members of our support team have been notified, while you wait, please describe the issue.\n\n**Ticket Type:** Internal Affairs\n\n**Ticket Commands:**\n• /close | Closes the ticket.\n• /add | Adds a person to the ticket.\n• /remove | Removes a person from the ticket.\n\n**Please Note:**\nText in this channel will be recorded and transcribed for quality assurance and training purposes.`)
            .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
            .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953205305675807/Ticket_System.png?ex=667f0112&is=667daf92&hm=a549ef1889d5a2576297c0c4b7dc483bdd43414354e4c88cbd0879e297f229e4&=&format=webp&quality=lossless&width=1157&height=305')
            .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});
  
            await channel.send({embeds: [embed] })
            
          };
      });
   
  },

  name: 'ticket-system',
  description: 'Use the ticket system.',
  options: [],
  permissionsRequired: [PermissionFlagsBits.Administrator],
};