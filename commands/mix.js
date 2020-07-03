const ytdl = require('ytdl-core');
const mixes = [
    "https://www.youtube.com/watch?v=lTRiuFIWV54",
    "https://www.youtube.com/watch?v=wAPCSnAhhC8",
    "https://www.youtube.com/watch?v=xjadNS2HBpM",
    "https://youtu.be/GdzrrWA8e7A",
    "https://youtu.be/AvhplYM46Fc"
];

module.exports = {

	name: 'mix',
	description: 'Plays a random lofi mix!',
	execute(channelType, currentVoiceChannel, globalBotVolume) {
        currentVoiceChannel.leave();
        if (channelType !== 'text') return;

        const voiceChannel = currentVoiceChannel;

        if (!voiceChannel) {
            return message.reply('please join a voice channel first!');
        }

       voiceChannel.join().then(connection => {
            const randomMix = mixes[Math.floor(Math.random() * mixes.length)];
            const stream = ytdl(randomMix, {
                filter: 'audioonly',
            });
            const dispatcher = connection.play(stream, { volume: globalBotVolume });

            dispatcher.on('end', () => voiceChannel.leave());
        });
	},
};