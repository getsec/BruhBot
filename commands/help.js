module.exports = {
    name: 'help',
    description: 'Shows the help menu!',
    execute(message, version) {
        const exampleEmbed = {
            color: 0x0099ff,
            title: `BruhBot Help Menu v${version}`,
            url: 'https://reddit.com/r/spacedicks',

            description: 'this bot plays sounds and also plays cjams awesome yoooooo when you join a channel',
            fields: [
                {
                    name: 'What do you do!',
                    value: 'Well, take a look...',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: '`!kill`',
                    value: 'Kick the bot from your voice channel',
                    inline: true,
                },
                {
                    name: '`!mix`',
                    value: 'Plays random lofi hiphop mix',
                    inline: true,
                },
                {
                    name: '`!sounds`',
                    value: 'Shows all of the sound commands that can be played',
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: 'Anyone like honey eggs?',
            },
        };

        message.channel.send({ embed: exampleEmbed });

    },
};