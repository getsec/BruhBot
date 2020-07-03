
module.exports = {

	name: 'sounds',
	description: 'Shows all the sounds we got',
	execute(message, voiceCommands) {
        message.channel.send(` \`${voiceCommands}\``)
	},
};