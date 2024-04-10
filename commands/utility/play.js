const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior  } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play song')
		.setDescription('Plays requested song'),
	async execute(interaction) {
        const subscription = connection.subscribe(audioPlayer);
        const resource = createAudioResource('/home/user/voice/track.mp3');

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });

        if (subscription) setTimeout(() => subscription.unsubscribe(), 5_000);
        

        player.play(resource);
        connection.subscribe(player);
        await interaction.reply('Song starting');
    }
}; 


