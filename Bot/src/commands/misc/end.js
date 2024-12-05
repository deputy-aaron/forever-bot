const { EmbedBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js");
const sessionsSchema = require('../../models/Sessions');

module.exports = {
  name: 'session-end',
  description: 'Use the sessions system.',
  deleted: false,

  callback: async (client, interaction) => {

    const sessionChannel = interaction.guild.channels.cache.get('1246764117814018158');

    const ssd = new EmbedBuilder()
    .setTitle('Server Shut Down!')
    .setDescription(`Our server is now shutdown, we will see you soon! Please do not join the server whilst it is shutdown. \n\nAnother session will commence shortly, keep an eye on this channel for the next session.\n\n**Thanks for a great session!**`)
    .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953204244385833/Server_Shut_Down.png?ex=66a736d2&is=66a5e552&hm=9e2fec6c8025c75f894a24664a3eb124df71711dafd1b31a4cee09e24f49f7a7&=&format=webp&quality=lossless&width=1015&height=638')
    .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=668fc0b2&is=668e6f32&hm=dcf67ee43eab29547102200922682e1992b66328efcefc5b05bda4cca1ba20bb&=&format=webp&quality=lossless&width=625&height=625')
    .setTimestamp()
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
    .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});

    const data = await sessionsSchema.find({ Session: 'Session'})

    if (!data) {
      await interaction.reply({ content: '<:Failed:1266985266665492543> There is no session active to announce the shutdown of.', ephemeral: true})
    }

    if (data) {
      await sessionsSchema.deleteMany({ Session: 'Session'})

      await sessionChannel.send({ embeds: [ssd]})

      await interaction.reply({ content: 'Announced the shut down of the session.', ephemeral: true})
    }

  },
};
