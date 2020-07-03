const ytdl = require('ytdl-core');

module.exports = {
	name: 'lofi',
	description: 'Plays lofi hip hop music to chill and relax too!',
	execute(channelType, currentVoiceChannel, globalBotVolume) {
        currentVoiceChannel.leave();
        if (channelType !== 'text') return;

        const voiceChannel = currentVoiceChannel;

        if (!voiceChannel) {
            return message.reply('please join a voice channel first!');
        }

        voiceChannel.join().then(connection => {
            const stream = ytdl("https://www.youtube.com/watch?v=-FlxM_0S2lA&t=3s", {
                filter: 'audioonly',
            });
            const dispatcher = connection.play(stream, { volume: globalBotVolume });

            dispatcher.on('end', () => voiceChannel.leave());
        });
	},
};