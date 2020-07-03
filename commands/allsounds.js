module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(connection) {
		try {
            soundFiles.forEach(i => {
                let soundFileCommand = i.replace('.mp3', '');
                let soundFilePath = `./assets/${i}`;
                if (command === soundFileCommand) {
                    const dispatcher = connection.play(soundFilePath, { volume: globalBotVolume });
                    playSound(soundFilePath, connection, dispatcher);
                }
            });
        } catch (e) {
            message.channel.send(e);
            console.log(e);
        }
	},
};