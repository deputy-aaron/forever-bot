const { ApplicationCommandOptionType, Events, ModalBuilder, TextInputBuilder, TextInputStyle,PermissionOverwrites,PermissionOverwriteManager,PermissionOverwriteOptions, Client, ChannelType,PermissionsBitField, Interaction, PermissionFlagsBits, ComponentType, EmbedBuilder, ButtonBuilder, ButtonStyle, ButtonComponent, ActionRowBuilder, RoleSelectMenuBuilder } = require('discord.js');
const AutoRole = require('../../models/AutoRole');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle('**Ottawa Dashboard**')
      .setColor(0x2b2d31)
      .setDescription('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n `Ottawa Roleplay`  \n Founded: 04/01/24\n\nDirector: <@722008765053796383>\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**Important Links**\n[Permanent Invite Code](https://discord.gg/BMgfWkRGzX)\n[Our Whitelisted Group](https://www.roblox.com/groups/13098780/Ottawa-Firefighter-Roleplay#!/about)\n[Our Roblox Group](https://www.roblox.com/groups/34068282/Ottawa-Whitelisted-Departments-Staff#!/about)\n[Our Staff Application](https://melonly.xyz/forms/7205952301557616640)\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n To view or join our departments head over to <#1249811301253775390>.\n\n**To view more information click the buttons below!**')
      .setImage('https://media.discordapp.net/attachments/991360353428582451/1255953207033860096/Information.png?ex=667f0113&is=667daf93&hm=bfcc66c589cb664807afb8cac2b41356915b794ca009fdf0b60bd15d41e5a863&=&format=webp&quality=lossless&width=1157&height=305')
      .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')

  const firstButton = new ButtonBuilder()
  .setLabel('Game Rules')
  .setStyle(ButtonStyle.Primary)
  .setCustomId('first-button')
  .setEmoji('<:Roblox:1255162345106440334>')

  const secondButton = new ButtonBuilder()
  .setLabel('Discord Rules')
  .setStyle(ButtonStyle.Secondary)
  .setCustomId('second-button')
  .setEmoji('<:Discord:1255162320108388537> ')

  const thirdButton = new ButtonBuilder()
  .setLabel('Chain of Command')
  .setStyle(ButtonStyle.Success)
  .setCustomId('third-button')
  .setEmoji('<:DirectiveTeam:1250125171449401366>')

  const buttRow = new ActionRowBuilder().addComponents(firstButton, secondButton, thirdButton);

  const reply = await interaction.channel.send({ embeds: [embed] ,content: '', components: [buttRow] });

  const collector = reply.createMessageComponentCollector({
    componentType: ComponentType.Button,
  });

  collector.on('collect', (interaction) => {
    if (interaction.customId === 'first-button') {
      const embed = new EmbedBuilder()
      .setTitle("**Game Regulations**")
      .setColor(0x2b2d31)
      .setDescription("Failure to follow these rules will result in any of the following punishments below. (If severe enough these can also apply to our Discord Server too.)")
      .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
      .addFields(
        {name: '⠀', value: '```Server Kicks, Server Bans & Server Mutes.```'},
        {name: '`1` - **Crime Roleplay**', value: 'If you are to witness a crime you have to stay at the scene to answer questions. This is so OPP or OPS can work a case file.', inline: true},
        {name: '`2` - **Motion**', value: "You need motions for cuffing, along with any other interactions that don't already have a animation. This excludes firearms.", inline: true},
        {name: '`3` - **Metagaming**', value: "Using information you could not have obtained. (Discord messages, Scanner ETC). Use only info your character has.", inline: true},
        {name: '`4` - **New Life Rule**', value: "Don't return to previous RP scenes as the same character. You died. Live a new life. Don't do anything from before death.", inline: true},
        {name: '`5` - **Mini modding**', value: "Mini-modding is acting like a staff member. This is not allowed. Don't impersonate our staff members at all times.", inline: true},
        {name: '`6` - ** Fear-RP**', value: "Don't pull a weapon when there's a gun on your head. You are in FEAR of your life. So roleplay like it. This can avoid arguments.", inline: true},
        {name: '`7` - **Safe zones**', value: `The following areas are safezones, these areas can not have RPs occur in them.

Gunstore, Civilian Spawn any spawn point for departments.`, inline: true},
        {name: '`8` - ** Common Sense**', value: "Use common sense, don't try to find ways around the rules even if the way around it isn't in the rules it will still be linked to it and will result in the same punishments.", inline: true},
        {name: '`9` - ** Recording**', value: "We strongly advice to use a recording system. This helps in moderation cases as without proof there are no punishments.", inline: true},
        {name: '⠀', value: '`Roleplays such as Sexual RP, Suicide RP, Bomb RP and more are banned. For more information read Roblox ToS or ask one of our staff.`'},
      )

        interaction.reply({ embeds: [embed], ephemeral: true })  
      return;
    }

    if (interaction.customId === 'second-button') {
      const embed = new EmbedBuilder()
      .setTitle("**Discord Regulations**")
      .setColor(0x2b2d31)
      .setDescription("Failure to follow these rules will result in any of the following punishments below. (If severe enough these can also apply to our Roblox Server too.)")
      .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
      .addFields(
        {name: '⠀', value: '```Server Kicks, Server Bans & Server Mutes.```'},
        {name: '`1` - **Terms of Service**', value: 'You are to follow the Discord ToS at all times. This server follows their rules guidelines. Meaning if you break them you will be moderated.', inline: true },
        {name: '`2` - **Arguing**', value: 'Do not argue with the staff team. If a punishment is handed out, either make a report ticket or DM a member of Server Leadership.', inline: true },
        {name: '`3` - **Disrespect**', value: 'Disrespecting people is not allowed. This includes racism or discriminating content. Breaking this rule will result in a permanent ban.', inline: true },
        {name: '`4` - **Common Sense**', value: 'Use common sense, if you think something is going against rules, simply do not do it. Following that can avoid you infractions.', inline: true },
        {name: '`5` - **Alt Accounts**', value: 'Using alt accounts to avoid punishments is not permitted. However alt-accounts themselves are allowed within our server.', inline: true },
        {name: '`6` - **Profile**', value: 'Your server profile cannot be suspicious. You need your have your Roblox username as server nickname along with an optional callsign.', inline: true },
        {name: '`7` - **Harassment**', value: 'Harassing members of this server is not permitted (including DMs) doing so will result in moderation.', inline: true },
        {name: '`8` - **Profanity**', value: 'Low level swearing is allowed. As long as the words are not directed at someone nor hurt anyone.', inline: true },
        {name: '`9` - **Advertising**', value: 'Advertising is not allowed in this server. Should someone DM advertise to you, report them with proof.', inline: true },
    );

      interaction.reply({ embeds: [embed], ephemeral: true })
      return;
      }

      if (interaction.customId === 'third-button') {
        const embed = new EmbedBuilder()
        .setTitle("**Chain of Command**")
        .setColor(0x2b2d31)
        .setDescription("This is the server's Chain of Command, please follow it. Should you require support, don't DM someone, open a ticket below!\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**`Directive Team:`**\nThe Directive Team is the most senior staff, they make the most important decisions and lead the entirety of the staff team. They should be the last people you contact, here are their ranks:\n\n**· Director**\n**· Deputy Director**\n**· Assistant Director**\n\n**`Internal Affairs:`**\nThe Internal Affairs team has many responsiblites, from managing the staff team, hosting SSUs or investigating staff abuse they do it all. They should be the second last people to contact, should you need to report a staff member, open a ticket below! Here are their ranks: \n\n**· Internal Affairs Director**\n**· Senior Internal Affairs Agent**\n**· Internal Affairs Agent**\n**· Trial Internal Affairs**\n\n**`Game Administration:`**\nThe Administration Team is responsible for supervising the server's staff. They ensure that the other departments are functioning well and provide a level of seniority when needed. You should contact Game Administration for more important situations or open a ticket! Below are their ranks:\n\n**· Head Administrator**\n**· Senior Administrator**\n**· Adminstrator**\n**· Junior Administrator**\n\n**`Moderation Team:`**\nThe Moderation Team are made up of the most junior staff, they moderate the in-game server and the Discord ensuring everyone is following the rules. They should be the first ones to contact if you need help, here are their ranks:\n\n**· Head Moderator**\n**· Senior Moderator**\n**· Moderator**\n**· Junior Moderator**\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n**Additional Ranks:**\n\n**`Staff Trainer:`**\nThis rank is an extra, people with this rank are responsible for hosting staff trainings.\n\n**`Trial Staff:`**\nPeople with this rank are not Official Staff yet, they have passed the application but still require training. Below are the possible ranks:\n\n**· Phase One**\n**· Phase Two**")
        .setThumbnail('https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=667e9d32&is=667d4bb2&hm=52d78feab0ccdab49807132f767915b3b3224f210ae1bd34590164f43d2443fd&=&format=webp&quality=lossless&width=625&height=625')
        
        interaction.reply({ embeds: [embed], ephemeral: true })
        return;
        }  
      },
    )},

  name: 'dash',
  description: 'Send a embed.',
  options: [],
  permissionsRequired: [PermissionFlagsBits.Administrator],
};