const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const Schema = require("../../models/AuditLog");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const { guild } = interaction;
 
        const data = await Schema.findOne({
            Guild: guild.id,
        });
        if (!data) {
            return await interaction.reply("🚫 You don't have an audit log system set up in this server!");
        }

        await Schema.deleteMany({
            Guild: guild.id,
        });

        const embed = new EmbedBuilder()
        .setTitle("✅ Audit Log Deleted")
        .setDescription(`The audit log system has been successfully deleted from **${guild.name}**. To set it up again, use the setup command!`)
        .setColor("Blue")
        .setThumbnail("https://i.imgur.com/PcMoVgq.png")
        .setFooter({ text: "TIW Bot", iconURL: "https://i.imgur.com/PcMoVgq.png" })
        .setTimestamp();
 
        return await interaction.reply({
            embeds: [embed],
        });
  },

  name: 'auditlog-disable',
  description: 'Disable audit-logging in this server.',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};
