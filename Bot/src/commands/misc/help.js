const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
  name: 'help',
  description: "View all the bot's commands.",

  callback: async (client, interaction) => {
    const commandsPerPage = 10;
    const allCommands = client.commands.map((command) => `/${command.data.name} - ${command.data.description}`);
    const totalPages = Math.ceil(allCommands.length / commandsPerPage);

    let currentPage = 0;

    const generateEmbed = (page) => {
      const embed = new EmbedBuilder()
        .setTitle("Advanced Help Menu")
        .setDescription("This is a very advanced help menu.")
        .setColor("Random")
        .setFooter({ text: `Page ${page + 1} of ${totalPages}` })
        .setTimestamp();

      const start = page * commandsPerPage;
      const end = start + commandsPerPage;
      const commandList = allCommands.slice(start, end);

      // Split commandList into chunks to fit into embed fields
      const fieldChunks = [];
      let currentChunk = [];

      for (const command of commandList) {
        if (currentChunk.join("\n").length + command.length > 1024) {
          fieldChunks.push(currentChunk.join("\n"));
          currentChunk = [command];
        } else {
          currentChunk.push(command);
        }
      }

      if (currentChunk.length > 0) {
        fieldChunks.push(currentChunk.join("\n"));
      }

      fieldChunks.forEach((chunk, index) => {
        embed.addFields({ name: index === 0 ? "Commands" : "\u200B", value: chunk });
      });

      return embed;
    };
    const generateButtons = (page) => {
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("previous")
              .setLabel("Previous")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(page === 0),
            new ButtonBuilder()
              .setCustomId("next")
              .setLabel("Next")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(page === totalPages - 1)
          );
  
        return row;
      };
  
      const initialEmbed = generateEmbed(currentPage);
      const initialButtons = generateButtons(currentPage);
  
      const message = await interaction.reply({
        embeds: [initialEmbed],
        components: [initialButtons],
        fetchReply: true
      });
  
      const filter = (i) => i.customId === 'previous' || i.customId === 'next';
      const collector = message.createMessageComponentCollector({ filter, time: 60000 }); // 1 minute collector
  
      collector.on('collect', async (i) => {
        if (i.customId === 'previous') {
          currentPage--;
        } else if (i.customId === 'next') {
          currentPage++;
        }
  
        const updatedEmbed = generateEmbed(currentPage);
        const updatedButtons = generateButtons(currentPage);
  
        await i.update({ embeds: [updatedEmbed], components: [updatedButtons] });
      });
  
      collector.on('end', async () => {
        const disabledButtons = generateButtons(currentPage);
        disabledButtons.components.forEach(button => button.setDisabled(true));
        await message.edit({ components: [disabledButtons] });
      });
    },
  }; 
