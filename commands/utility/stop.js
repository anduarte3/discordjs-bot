const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops music and disconnects'),
	async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        connection.destroy();
    }
}; 