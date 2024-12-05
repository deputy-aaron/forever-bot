const { ApplicationCommandOptionType, Events, ModalBuilder, TextInputBuilder, TextInputStyle,PermissionOverwrites,PermissionOverwriteManager,PermissionOverwriteOptions, Client, ChannelType,PermissionsBitField, Interaction, PermissionFlagsBits, ComponentType, EmbedBuilder, ButtonBuilder, ButtonStyle, ButtonComponent, ActionRowBuilder } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');


module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    function generateRandomCode(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
  
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
      }
  
      return result;
  }

  const length = 10; // Specify the length of the random code
  const randomCode = generateRandomCode(length); // Call the function to generate the random code

const embedOne = new EmbedBuilder()
.setTitle('Closing Ticket')
.setColor(0x2b2d31)
.setDescription(`${interaction.user} has requested to close this ticket. If this is wrong press the 'cancel' button.`)
.setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
.setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});

const firstButton = new ButtonBuilder()
      .setLabel('Close')
      .setStyle(ButtonStyle.Danger)
      .setCustomId('first-button')
    
      const buttRow = new ActionRowBuilder().addComponents(firstButton);
    
      const reply = await interaction.channel.send({embeds: [embedOne], content: '', components: [buttRow] });

      const collector = reply.createMessageComponentCollector({
        componentType: ComponentType.Button,
      });
    
      collector.on('collect', async (interaction) => {
        if (interaction.customId === 'first-button') {        

          const channel = interaction.channel

        await interaction.reply({content: `Preparing transcript, this may take a while.`, ephemeral: true});

        const file = await createTranscript(channel, {
          limit: 100000000,
          returnBuffer: false,
          filename: `${channel.name.toLowerCase()}.transcript.html`
        });

        let cache = client.channels.cache.get('1252681331553472543');
        let msg = await cache.send({ files: [file] });

        const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setLabel(`Open`)
          .setURL(`https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`)
          .setStyle(ButtonStyle.Link),

          new ButtonBuilder()
          .setLabel(`Download`)
          .setURL(`${msg.attachments.first()?.url}`)
          .setStyle(ButtonStyle.Link)
        
        )

        const closingEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle('Ticket Closing Information')
        .setColor(0x2b2d31)
        .setDescription(`Below you can find the relevent information should you need to report an action within this ticket.\n\n**Ticket Identifer:** ${randomCode}\n**Ticket Closer:** ${interaction.user} \n**Transcript:** Links below, you can choose between downloading the file or simply viewing it in your browser.`)

        const transEmbed = new EmbedBuilder()
        .setTitle('Ticket Closed')
        .setColor(0x2b2d31)
        .setDescription(`A ticket has been closed, below you can find the relevent information.\n\n**Ticket Owner:** ${channel.topic} \n**Ticket Closed By:** ${interaction.user}\n**Ticket Identifier:** ${randomCode} \n**Transcripts:** Found below.`)

        const closed = new EmbedBuilder()
        .setTitle('Ticket Closed')
        .setDescription(`Your ticket has been closed by ${interaction.user}, should you feel that the support you received was sufficient feel free to open another ticket.\n\n**Ticket Identifier:** ${randomCode}\n**Transcript:** Found below.`)
        .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=668fc0b2&is=668e6f32&hm=dcf67ee43eab29547102200922682e1992b66328efcefc5b05bda4cca1ba20bb&=&format=webp&quality=lossless&width=625&height=625')
        .setTimestamp()
        .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});
        

        const targetUser = await interaction.guild.members.fetch(`${interaction.channel.topic}`);

        await cache.send({ embeds: [transEmbed], content: ``, components: [button], ephemeral: true})

        await interaction.editReply({ embeds: [closingEmbed], content: ``, components: [button], ephemeral: true}) 

        targetUser.send({ embeds: [closed], components: [button] })

        channel.delete();
;
}});
        ;

        
  },
  name: 'close',
    description: 'Use this to close the ticket.',
    options: [],
    permissionsRequired: [PermissionFlagsBits.ManageChannels],
};