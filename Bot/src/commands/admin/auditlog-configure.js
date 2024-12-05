const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const Schema = require('../../models/AuditLog');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const guild = interaction.guild;
        const channel = interaction.options.get("channel");

        let config = await Schema.findOne({ Guild: guild.id });
        if (!config) {
            config = await Schema.create({
                Guild: guild.id,
                Channel: channel.id,
                LogLevel: []
            });
        }
        const currentSettings = config.LogLevel || [];

        let currentSettingsList = currentSettings.length > 0
        ? currentSettings.join('\n')
        : 'None selected.';    

        const selectOptions = [
            { label: 'Channel Create', description: 'A channel was created', value: 'channelCreate' },
            { label: 'Channel Update', description: 'A channel was updated', value: 'channelUpdate' },
            { label: 'Channel Delete', description: 'A channel was deleted', value: 'channelDelete' },
            { label: 'Message Create', description: 'A message was created', value: 'messageCreate' },
            { label: 'Message Delete', description: 'A message was deleted', value: 'messageDelete' },
            { label: 'Message Update', description: 'A message was updated', value: 'messageUpdate' },
            { label: 'Voice States', description: 'A user joined a voice channel!', value: 'voiceChannelActivity'},
            { label: 'Guild Member Add', description: 'A new member joined a guild', value: 'guildMemberAdd' },
            { label: 'Guild Member Remove', description: 'A member was removed from a guild', value: 'guildMemberRemove' },
            { label: 'Guild Ban Add', description: 'A member was banned from a guild', value: 'guildBanAdd' },
            { label: 'Guild Ban Remove', description: 'A ban was lifted from a member', value: 'guildBanRemove' },
            { label: 'Guild Update', description: 'A guild (server) was updated', value: 'guildUpdate' },
            { label: 'Role Create', description: 'A role was created', value: 'roleCreate' },
            { label: 'Role Update', description: 'A role was updated', value: 'roleUpdate' },
            { label: 'Role Delete', description: 'A role was deleted', value: 'roleDelete' },
            { label: 'Emoji Create', description: 'An emoji was created', value: 'emojiCreate' },
            { label: 'Emoji Update', description: 'An emoji was updated', value: 'emojiUpdate' },
            { label: 'Emoji Delete', description: 'An emoji was deleted', value: 'emojiDelete' },
            { label: 'User Updates', description: 'A user has been updated!', value: 'userUpdates' },
            { label: 'Invite Create', description: 'An invite was created', value: 'inviteCreate' },
            { label: 'Invite Delete', description: 'An invite was deleted', value: 'inviteDelete' },
        ]
        .map(option => ({
            ...option,
            default: currentSettings.includes(option.value),
        }));

        const loggingLevelsSelectMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('selectLoggingLevel')
                    .setPlaceholder('Choose logging levels...')
                    .setMinValues(1)
                    .setMaxValues(selectOptions.length)
                    .addOptions(selectOptions)
            );

        const setupEmbed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("🔧 Audit Log Setup")
            .setDescription(`Select the events you want to log from the dropdown menu below. You can select multiple events based on your requirements.\n\n**Current Logging Levels:**\n${currentSettingsList}`)
            .setThumbnail("https://i.imgur.com/PcMoVgq.png")
            .setFooter({ text: "Use the dropdown menu to select or update your audit log settings." })
            .setTimestamp();

        await interaction.reply({
            embeds: [setupEmbed],
            components: [loggingLevelsSelectMenu],
            ephemeral: true
        });
  },

  name: 'auditlog-configure',
  description: 'Configure your audit-logging for this server.',
  options: [
    {
      name: 'channel',
      description: 'The channel to log events to.',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
};
