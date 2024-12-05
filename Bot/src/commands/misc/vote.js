const { EmbedBuilder, ButtonBuilder, ButtonStyle, ApplicationCommandOptionType, ActionRowBuilder, ComponentType } = require("discord.js");
const sessionsSchema = require('../../models/Sessions')

module.exports = {
  name: 'session-vote',
  description: 'Start a vote for a server start up.',
  options: [
    {
      name: 'votes-required',
      description: 'The number of votes required to start the session.',
      type: ApplicationCommandOptionType.Number,
      required: true,
    }
  ],

  callback: async (client, interaction) => {

    const number = await interaction.options.get("votes-required").value;

    const sessionChannel = await interaction.guild.channels.cache.get('1246764117814018158');

    const ssu = new EmbedBuilder()
    .setTitle('Server Start Up!')
    .setDescription(`Our in-game server has started up, come join us for some amazing roleplays! If you voted you are **required** to join.\n\n**Host:** ${interaction.user}\n**Server Code:** OTTWCITYRP`)
    .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953204622135306/Server_Start_Up.png?ex=668f7bd2&is=668e2a52&hm=d855185125228b392cf94fb618a90af080d663c89e52d2882f3399a2a5cdeb4a&=&format=webp&quality=lossless&width=1015&height=638')
    .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=668fc0b2&is=668e6f32&hm=dcf67ee43eab29547102200922682e1992b66328efcefc5b05bda4cca1ba20bb&=&format=webp&quality=lossless&width=625&height=625')
    .setTimestamp()
    .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});

    const ssv = new EmbedBuilder()
    .setTitle('Sessions Vote!')
    .setColor(0x2b2d31)
    .setImage('https://media.discordapp.net/attachments/1132226322173788241/1137500069046788197/image_-_2023-08-06T093852.920.png?ex=66a7633e&is=66a611be&hm=31014582481db46723f30b81ad4dadc7b7153c4daecee5340eafcf29b227cd44&=&format=webp&quality=lossless&width=1202&height=38')
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\nA member of the management team as decided to initiate a session vote. Please react regarding your attendance to this startup. Note; If you have reacted, you must join once the session starts.\n\n**Votes Required:** \`${number}\``)
    .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=668fc0b2&is=668e6f32&hm=dcf67ee43eab29547102200922682e1992b66328efcefc5b05bda4cca1ba20bb&=&format=webp&quality=lossless&width=625&height=625')

    const firstButton = new ButtonBuilder()
    .setLabel('Vote')
    .setStyle(ButtonStyle.Success)
    .setCustomId('vote')

    const secondButton = new ButtonBuilder()
    .setLabel('View Votes')
    .setStyle(ButtonStyle.Primary)
    .setCustomId('view')

  const buttRow = new ActionRowBuilder().addComponents(firstButton, secondButton);

  const reply = await sessionChannel.send({ embeds: [ssv] ,content: '<@&1247930908548530327>', components: [buttRow] });

  const collector = reply.createMessageComponentCollector({
    componentType: ComponentType.Button,
  });

  collector.on('collect', async (interaction) => {
    if (interaction.customId === 'vote') {

    const data = await sessionsSchema.find({ Voter: `${interaction.user.id}`});

      if (!data) {
        await sessionsSchema.findOneAndDelete({ Voter: `${interaction.user.id}`});

        interaction.reply({content: `<:Success:1266985319342018610> Vote removed.`, ephemeral: true})

      }

      if (data) {
      await sessionsSchema.create({
        Session: 'Session',
        Voter: `${interaction.user.id}`
      })
        
      interaction.reply({content: `<:Success:1266985319342018610> Vote added.`, ephemeral: true})

      }
  }
  if (interaction.customId === 'view') {
  
    const votes = await sessionsSchema.find({ Session: `Session`});

    let embedDescription = 'Heres all the voters of the session:\n';
    votes.forEach((data, index) => {
    embedDescription += `${data} `; 
});

  const embed = new EmbedBuilder()
  .setTitle('Session Votes')
  .setDescription(`${embedDescription}`);

  await interaction.reply({ embeds: [embed], ephemeral: true});
  }

});

}};
