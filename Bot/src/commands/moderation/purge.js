const Moderation = require('../../models/Moderation');
const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder
} = require('discord.js');



module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {

    const amount = interaction.options.get("amount").value;

        const errorembed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("You can only delete between 1 and 99 messages.")
        .setColor("Red")

        if (amount < 1 || amount > 99) {
			return interaction.reply({ embeds: [errorembed], ephemeral: true });
		}

        const cleanembed = new EmbedBuilder()
        .setTitle("Cleared")
        .setDescription(`Succesfully deleted ${amount} messages.`)
        .setColor("Green")

        await interaction.channel.bulkDelete(amount, true);
        return interaction.reply({ embeds: [cleanembed], ephemeral: true });
  },

  name: 'purge',
  description: 'Purge a specific amount of messages.',
  options: [
    {
      name: 'amount',
      description: 'The number of messages to delete.',
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageMessages],
};
