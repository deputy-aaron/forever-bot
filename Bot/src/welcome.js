const { Client, IntentsBitField, ActivityType,  ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, Guild, ChannelType } = require('discord.js');

module.exports = client => {

    client.on("guildMemberAdd", member => {

       console.log(member)

        const embed = new EmbedBuilder()
        .setTitle("**Welcome!**")
        .setDescription(`Welcome to Ottawa Roleplay ${member}, I am this server's main bot and I am to make your life easier by giving you tip and tricks! To start off you need to verify, to find out how to check out <#1246761012040830996>.`)
        .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625' })
        .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
        .setImage('https://media.discordapp.net/attachments/991360353428582451/1255958043297058917/Join.png?ex=667f0594&is=667db414&hm=2e2d869b22ad40e60a95b8aa761586a86fdee7d2e5c03960cd23887175ee26ec&=&format=webp&quality=lossless&width=1157&height=305')
        .setTimestamp();

        const channel = member.guild.channels.cache.get('1249807584614158478');

        channel.send({ embeds: [embed] });

        const dmMessage = `Welcome to **Ottawa Roleplay**, ${member}.`;

        member.send(dmMessage).catch(err => {
            return;
        })   
    })
}