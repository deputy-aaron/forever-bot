const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const Moderation = require('../../models/Moderation');
const ms = require('ms');

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

    const mentionable = interaction.options.get('target-user').value;
    const duration = interaction.options.get('duration').value; // 1d, 1 day, 1s 5s, 5m
    const reason = interaction.options.get('reason')?.value || 'No reason provided';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(mentionable);
    if (!targetUser) {
      await interaction.editReply({ content: "That user doesn't exist in this server.", ephemeral: true});
      return;
    }

    if (targetUser.user.bot) {
      await interaction.editReply({ content: "I can't timeout a bot.", ephemeral: true});
      return;
    }

    const msDuration = ms(duration);
    if (isNaN(msDuration)) {
      await interaction.editReply({ content: 'Please provide a valid timeout duration.', ephemeral: true});
      return;
    }

    if (msDuration < 5000 || msDuration > 2.419e9) {
      await interaction.editReply({content:'Timeout duration cannot be less than 5 seconds or more than 28 days.', ephemeral: true});
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply({ content: "You can't timeout that user because they have the same/higher role than you.", ephemeral: true});
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply({ content: "I can't timeout that user because they have the same/higher role than me.", ephemeral: true});
      return;
    }
    
    // Timeout the user
    try {
      const { default: prettyMs } = await import('pretty-ms');
      
      const newMod = new Moderation({
        userId: `${targetUserId}`, // Example userId
        guildId: '1246579838639411240', // Example guildId
        moderator: `${interaction.user.id}`, // Example moderator
        caseId: `${randomCode}`,
        type: `Timeout for ${prettyMs(msDuration, { verbose: true })}`, // Example type
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

      const dmEmbed = new EmbedBuilder()
      .setTitle('Ottawa Roleplay | Canada')
      .setColor(0x2b2d31)
      .setDescription(`You have been given a timeout from Ottawa Roleplay | Canada.\n\n**Reason**\n> ${reason}\n\n**Case ID**\n> ${randomCode}\n\n**Duration**\n> ${prettyMs(msDuration, { verbose: true })}`)
      .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
      .setTimestamp()
      .setFooter({ text: 'Ottawa Server Staff', iconURL: 'https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625'});
      
      if (targetUser.isCommunicationDisabled()) {
        await targetUser.timeout(msDuration, reason);
        await interaction.editReply({ content: `${targetUser}'s timeout has been updated to ${prettyMs(msDuration, { verbose: true })}\nReason: ${reason}`, ephemeral: true});
        return;
      }

      await targetUser.timeout(msDuration, reason);
      await interaction.editReply({content:`${targetUser} was timed out for ${prettyMs(msDuration, { verbose: true })}.\nReason: ${reason}`, ephemeral: true});
      await targetUser.send({embeds: [dmEmbed]})
    } catch (error) {
      console.log(`There was an error when timing out: ${error}`);
    }
  },

  name: 'timeout',
  description: 'Timeout a user.',
  options: [
    {
      name: 'target-user',
      description: 'The user you want to timeout.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'duration',
      description: 'Timeout duration (30m, 1h, 1 day).',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason for the timeout.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.MuteMembers],
};
