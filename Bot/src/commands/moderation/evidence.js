const Evidence = require('../../models/Evidence');
const Moderation = require('../../models/Moderation')
const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {

    const caseid = interaction.options.get('case-id').value;
    const description = interaction.options.get('description')?.value || "No description provided.";
    const evidence = interaction.options.get('evidence').value;

    const Data1 = await Moderation.find({ caseId: caseid})

    if (!Data1) {
      const FailedEmbed = new EmbedBuilder()
      .setTitle('Search Failed')
      .setDescription(`I couldn't find any cases with the ID of ${caseid}, make sure the case ID matches **exactly**.`)
      .setTimestamp()

      return await interaction.reply({ embeds: [FailedEmbed], ephemeral: true});
    }

    const formattedCaseId = `\`${caseid}\``

    if (Data1) {
      await Evidence.create({
        caseId: `${caseid}`,
        description: `${description}`,
        evidence: `${evidence}`,
        guildId: `${interaction.guild.id}`,
        staff: `${interaction.user}`,
      })

  const addEmbed = new EmbedBuilder()
    .setTitle('Added Evidence')
    .setDescription(`Succesfully added the provided evidence to the following case.\n\n**Case:** ${formattedCaseId}`)
    .setTimestamp();

    const moderator = await Data1.moderator;

    const moduser = await interaction.guild.members.fetch(`${moderator}`);

    await moduser.send(`${interaction.user} has added evidence to a case you are responsible for (${caseid}).`)

    await interaction.reply({ embeds: [addEmbed], ephemeral: true})

    }
  },

  name: 'evidence',
  description: `Add evidence to a specific case.`,
  options: [
    {
      name: 'case-id',
      description: 'The ID of the case you wish to add evidence to.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'evidence',
      description: 'A link the the piece of evidence you wish to add to this case.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'description',
      description: 'Explain what this piece of evidence shows.',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
};
