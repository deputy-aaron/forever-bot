const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'run-command',
    description: 'Run a command in the ingame server, only works if someone is in the server.',
    options: [
        {
            name: 'command',
            description: `Command you want to run. FORMAT HOW YOU WOULD FORMAT IN GAME! EX: ":m Shutting Down" or ":heal all".`,
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
  
    callback: async (client, interaction) => {
      const { options } = interaction;
      const command = options.getString('command');
      const params = JSON.stringify({command: `${command}`})
      fetch (`https://api.policeroleplay.community/v1/server/command`, {
          headers: {
              "Server-Key": process.env.serverToken,
              "Content-Type": "application/json",
          },
        method: "POST",
        body: params


})
//console.log(res);
.then(result => result.json())
.then(response => {
retTime = ''
if (response.message == 'You are being rate limited!') {
  retTime = ' Retry in ' + response.retry_after + ' seconds.'
}
if (response.message != "Success") {
  return interaction.reply('Error: ' + response.message + retTime)
}
const embed = new EmbedBuilder()
      .setTitle('Command Ran')
      .setDescription(interaction.user.username + " used the remote server to run `" + command + "`")
      .setColor('336d91')
      .setTimestamp()

client.channels.cache.get(`YOUR LOGGING CHANNEL`).send({ embeds: [embed] });
interaction.reply({ content: `Command run successfully by <@${interaction.member.id}>!.`, ephemeral: true});
})
.catch(error => {
console.log(error)
///interaction.reply('Error occured: ' + error)
})     
    },
  };