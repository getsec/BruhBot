module.exports = {
    name: 'kill',
    description: 'Kicks a bot from the connected voice channel!',
    execute(mesasge) {
        currentVoiceChannel.leave();
    },
};