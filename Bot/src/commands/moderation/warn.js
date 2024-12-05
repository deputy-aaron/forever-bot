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

    const length = 15;
    const randomCode = generateRandomCode(length);

    const targetUserId = interaction.options.get('target-user').value;
    const reason =
      interaction.options.get('reason')?.value || 'No reason provided';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply({ content: "That user doesn't exist in this server.", ephemeral: true });
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply({
        content: "You can't warn that user because they're the server owner.",
        ephemeral: true
    });
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply({
        content: "You can't warn that user because they have the same/higher role than you.",
        ephemeral: true
    });
      return;
    }

    const dmEmbed = new EmbedBuilder()
    .setTitle('Ottawa Roleplay | Canada')
    .setColor(0x2b2d31)
    .setDescription(`You have been warned in Ottawa Roleplay | Canada.\n\n**Reason**\n> ${reason}\n\n**Case ID**\n>${randomCode}`)
    .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
    .setTimestamp()
    .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});

    // Ban the targetUser
    try {

      const newMod = new Moderation({
        userId: `${targetUserId}`, // Example userId
        guildId: '1246579838639411240', // Example guildId
        moderator: `${interaction.user}`, // Example moderator
        caseId: `${randomCode}`,
        type: `Warning`, // Example type
        reason: `${reason}`, // Example reason
      });
      
      // Save the new instance to the database
      newMod.save()
        .then((moderation) => {
          console.log('Moderation record added successfully:', moderation);
        })
        .catch((error) => {
          console.error('Error adding moderation record:', error);
        });

      await interaction.editReply({content: `User ${targetUser} was warned\nReason: ${reason}\nCase ID: ${randomCode}`,ephemeral: true,});
      targetUser.send({embeds: [dmEmbed]})
    } catch (error) {
      console.log(`There was an error when warning: ${error}`);
    }
  },

  name: 'warn',
  description: 'Warns a member in this server.',
  options: [
    {
      name: 'target-user',
      description: 'The user you want to warn.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason you want to warn.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
};
