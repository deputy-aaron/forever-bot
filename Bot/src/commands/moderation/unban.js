const Moderation = require('../../models/Moderation');
const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js');

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result;
}

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {

    const userId = interaction.options.get("target-id").value;
    const reason = interaction.options.get("reason")?.value || "No reason provided.";
    const targetUser = await client.users.fetch(userId);


        try {
            const user = await interaction.client.users.fetch(userId);
            await interaction.guild.bans.remove(userId, reason);

            const embed = new EmbedBuilder()
                .setDescription(`<@${user.id}> user successfully unbanned from the server!`)
                .setTitle("Unban")
                .setColor("#ffffff")
                .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp()
                .addFields({ name: 'Reason', value: `${reason || "No reason"}` });

            await interaction.reply({ embeds: [embed] });

            const dmEmbed = new EmbedBuilder()
            .setTitle('Ottawa Roleplay | Canada')
    .setColor(0x2b2d31)
    .setDescription(`You have been unbanned from Ottawa Roleplay | Canada.\n\n**Reason**\n> ${reason}\n\n**Staff Member**\n> ${interaction.user}`)
    .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
    .setTimestamp()
    .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});

        } catch (error) {
            console.error(error);
            await interaction.reply("An error occurred while unbanning!");
        }

  },

  name: 'unban',
  description: 'Unbans a member from this server.',
  options: [
    {
      name: 'target-id',
      description: 'The ID of the user you want to unban.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason you want to unban.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],
};
