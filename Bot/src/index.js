require('dotenv').config();
const { Client, IntentsBitField, ActivityType, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, Partials, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');
const modSchema = require('./models/Mod')
const blacklistSchema = require('./models/Blacklist')
const claimedSchema = require('./models/Claimed')
const Audit_Log = require('./models/AuditLog');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.DirectMessages,
  ], partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const roleId = '1246588239226077274';

  const oldRole = oldMember.roles.cache.has(roleId);
  const newRole = newMember.roles.cache.has(roleId);

  if (!oldRole && newRole) {
      // Role added to member
      await staffSchema.create({
        guildId: `1246579838639411240`,
        userId: `${newMember.user.id}`,
        joined: `${date.now()}`,
        bans: `0`,
        kicks: `0`,
        warns: `0`,
        timeouts: `0`,
      })
      newMember.guild.channels.cache.get('1254709169953701898').send(`${newMember.user.tag} was given the role!`);
  }
});

client.on(Events.MessageCreate, async message => {

  if (message.author.bot) return;

  const guildId = '1246579838639411240'
  const guild = client.guilds.cache.get(guildId)

  if (message.channel.type == ChannelType.DM) {

    const member = message.author;
    const posChannel = guild.channels.cache.find(c => c.name === `${message.author.id}`);
    const data = await modSchema.findOne({ Guild: guild.id, User: message.channel.name}).exec();
    const data2 = await blacklistSchema.find({ UserId: message.author.id})
    
    if(data2) {
      if (!data) {
        await modSchema.create({
          Guild: guild.id,
          User: member.id
        })
      }

      if (data) {
        await modSchema.create({
          Guild: guild.id,
          User: member.id
        })
      }

    if (message.attachments.size > 0) {
      message.react('❌')
      return member.send("I cannot send this message!")
     }
    
      if (!posChannel) {
      const category = guild.channels.cache.get('1256184610006765579');
      const channel = await guild.channels.create({
        name: `${message.author.id}`,
        type: ChannelType.GuildText, 
        parent: category,
        topic: `A mod mail sent by ${message.author.tag}`

      })

    const open = new EmbedBuilder()
    .setDescription('Your modmail conversation has been started! Please wait for a staff member to respond, you will be notified here.')
    .setTimestamp()

      member.send({embeds: [open] }).catch( err => {
        return;
      })

      const formattedId = `\`${message.author.id}\``

      const nMod = new EmbedBuilder()
      .setTitle('New Modmail')
      .setDescription(`${message.author} has opened a ticket. Please do your best to help them!`)
      .addFields(
        { name: `User ID:`, value: `
          ${formattedId}`, inline: true},
      );

        const firstButton = new ButtonBuilder()
        .setCustomId('button')
        .setStyle(ButtonStyle.Danger)
        .setLabel('Close')
        .setEmoji('🔐')

        const secondButton = new ButtonBuilder()
        .setCustomId('claim')
        .setStyle(ButtonStyle.Success)
        .setLabel('Claim')
        .setEmoji('🛄')
      
      const buttRow = new ActionRowBuilder().addComponents(firstButton, secondButton);

      const mes = await channel.send({ embeds: [nMod], components: [buttRow], content: '@<722008765053796383>' });

      const collector1 = mes.createMessageComponentCollector();

      collector1.on('collect', async (interaction) => {
        if (interaction.customId == 'button'){
          const close = new EmbedBuilder()
        .setDescription('Your modmail conversation has been closed by a staff member. Should you need assistance again, just DM me or open a ticket!')
          await channel.delete();
          member.send({ embeds: [close] })}
          claimedSchema.findOneAndDelete({ User: member.id })
        if (i.customId == 'claim'){

      const data = await claimedSchema.find({User: message.channel.name}).exec();

      if (!data) {
        await claimedSchema.create({
          Guild: guild.id,
          User: member.id
        })

      interaction.reply({ content: `You have succesfully claimed ${member}'s ticket.`, ephemeral: true})

      member.send({ content: `Your mail has been claimed by ${i.user}.`})
      
    }
    
    if (data) {
        interaction.reply({ Content: 'Sorry, this mail has already been claimed.', ephemeral: true})
      }
    }
  })

    channel.send({ content: `**${message.author.tag}:** ${message.content}`})
    message.react('📧')

      mes.pin();
      message.react('📧') 
  }

  if (posChannel) {
      posChannel.send({ content: `**${message.author.tag}:** ${message.content}` });
      message.react('📧')
      return;
      }
    }
  if (!data2) {
    const blackEmbed = new EmbedBuilder()
    .setTitle('Modmail Failed')
    .setDescription(`You have been blacklisted from using our Modmail system, to appeal this use the button below.`)

    const firstButton = new ButtonBuilder()
        .setCustomId('appeal')
        .setStyle(ButtonStyle.Success)
        .setLabel('Appeal')
        .setEmoji('🛄')
      
      const buttRow = new ActionRowBuilder().addComponents(firstButton);

      const mes = await message.author.send({ embeds: [blackEmbed], components: [buttRow] });

      const collector = mes.createMessageComponentCollector();

      collector.on('collect', async i => {
        if (i.customId == 'button'){
        const appealModal = new ModalBuilder()
        .setTitle(`Blacklist Appeal`)
        .setCustomId(`appeal`);

        const appealReason = new TextInputBuilder()
			.setCustomId('appealReason')
			.setLabel("Why should we accept your appeal?")
			.setStyle(TextInputStyle.Paragraph);

      const appealRow = new ActionRowBuilder().addComponents(appealReason)

      await interaction.showModal(appealModal);

      client.on(Events.InteractionCreate, interaction => {
      if (!interaction.isModalSubmit()) return;

      const dat = blacklistSchema.find({ userId: interaction.user.id});

      const appealReasonAnswer = interaction.fields.getTextInputValue('appealReason');

      formattedBlacklist = `\`\`\`${dat.reason}\`\`\``

      formattedReason = `\`\`\`${appealReasonAnswer}\`\`\``

      const channel = interaction.guild.channels.cache.get('1266227728575762553');

      const appeal = new EmbedBuilder()
      .setTitle('New Mail Appeal')
      .setDescription(`${interaction.user} has sent a modmail blacklist appeal, below is the relevent information.\n\n**Appeal Reason:**\n${formattedReason}\n**Blacklist Reason:**\n${formattedBlacklist}`)
      .addFields({name: `User ID:`, value:`${interaction.user.id}`})
      .addFields({name: `Blacklisted By:`, value: `<@${dat.staffId}>`})
      .setTimestamp()
      .setFooter({text: `${interaction.user.tag}`, iconURL})

      channel.send
    });
  }})
  }
}});

client.on(Events.InteractionCreate, async interaction => {

  if (!interaction) return;
  if (!interaction.isChatInputCommand()) return;
  else {

      const channel = await client.channels.cache.get('1263060308700954634');
      const user = interaction.user.username;
      const userID = interaction.user.id;

      const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`Slash Command Used!`)
      .addFields({ name: 'Command', value: `${interaction}`})
      .addFields({ name: 'User', value: `${user} (${userID})`})
      .setTimestamp()
      .setFooter({ text: 'Ottawa Roleplay | Canada', iconURL: `https://media.discordapp.net/attachments/991360353428582451/1255845963600367636/Ottawa_Final.png?ex=66a38732&is=66a235b2&hm=810650af22ae7aeafe551f8f89a735a23496437dc043152d0332032018712cc0&=&format=webp&quality=lossless&width=625&height=625`})

      await channel.send({ embeds: [embed] });
      
  }
})

client.on(Events.MessageCreate, async message => {

  if (message.channel.type === ChannelType.GuildText) {

    const guildId = '1246579838639411240'
    const guild = client.guilds.cache.get(guildId)

    const data = await modSchema.findOne({ Guild: guild.id, User: message.channel.name}).exec();

      if (data == null) return;

      const colChannel = guild.channels.cache.find(c => c.name === `${data.User}`);

      if (message.channel === colChannel) {
        if (message.author.bot) return;

        const memberUd = data.User;
        const member = await client.users.fetch(memberUd)
      
        if (message.attachments.size > 0) {
          message.react('❌')
          return member.send("I cannot send this message!")
         }

         message.react(`📧`)

        member.send({ content: `**${message.author.username}:** ${message.content}` })

      }
    }

  }
);

client.on(Events.MessageCreate, async message => {
  if (message.content.startsWith('http') || message.content.startsWith('discord.gg') || message.content.includes('https://') || message.content.includes('discord.gg') || message.content.includes('http://')) {
    
    const member = message.guild.members.cache.get(message.author.id);

      await message.reply({ content: `${message.author}, you cannot send messages with links.`, ephemeral: true})

      return await message.delete();
    }
  }
)

client.on('ready', (c) => {
  client.user.setActivity({
  name: '🍁 Ottawa Roleplay | /help',
  type: ActivityType.Custom,
  });
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');

    eventHandler(client);

    client.login(process.env.TOKEN);

  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();



