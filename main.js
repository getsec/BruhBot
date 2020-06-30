require('dotenv').config();
let chalk = require('chalk');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const token = process.env.CLIENT_TOKEN;
const version = '1.1';
const globalBotVolume = 0.4;
const soundFiles = fs.readdirSync('./assets').filter(file => file.endsWith('.mp3'));
const voiceCommands = [];
const ytdl = require('ytdl-core');
const mixes = [
    "https://www.youtube.com/watch?v=lTRiuFIWV54",
    "https://www.youtube.com/watch?v=wAPCSnAhhC8",
    "https://www.youtube.com/watch?v=xjadNS2HBpM",
    "https://youtu.be/GdzrrWA8e7A",
    "https://youtu.be/AvhplYM46Fc"
];

console.log(token);
soundFiles.forEach(i => {
    voiceCommands.push(i.replace('.mp3', ''));
});
voiceCommands.push('lofi')
console.log(voiceCommands)



const playSound = async(file, connection, dispatcher) => {
    // play
    dispatcher.on('start', () => {
        console.log(`${file} is now playing!`);
    });

    // when finished. Close 
    dispatcher.on('finish', () => {
        console.log(`${file} has finished playing!`);
        connection.disconnect();
    });

    // Always remember to handle errors appropriately!
    dispatcher.on('error', console.error);
};


// When the application starts, this is required...
client.on("ready", function() {
    let tag = client.user.tag;
    let id = client.user.id;
    console.log(`${chalk.greenBright('We have launched succesfully')} with ID ${id}.`);
    console.log(`Logged in as: ${chalk.yellow(tag)}!`);

    client.user.setActivity("your gf's heart 🤡");
    client.generateInvite(['SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE'])
        .then(link => {
            console.log(`Invite Link:  ${chalk.magentaBright(link)}`);
            let inviteLink = link;
        });
});


// Menu to loop through sounds and play them
client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // this will remove the bot from a voice channel if it gets annoying.
    if (command === "kill") {
        message.member.voice.channel.leave();
    }
    // Print help menu
    if (command === 'help') {
        const helpEmbedMessage = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Welcome to the help menu! ver: ${version}`)
            .setURL('https://youtu.be/dQw4w9WgXcQ')
            .setDescription(`Whats up, buttercup!`)

        .addFields({ name: 'Main Function', value: 'Every time you join a channel, you will get greeted with a CJ "yoooo"' }, { name: 'Play some funny sounds', value: `Make sure you are joined to a channel, and user the ! prefix and a name of a sound. The current set of sounds are: ${voiceCommands}` }, );
        message.channel.send(helpEmbedMessage);
    }
    // Plays lofi
    if (command === "lofi") {
        if (message.channel.type !== 'text') return;

        // If user isn't in a voice channel.
        if (!message.member.voice.channel) {
            return message.reply('please join a voice channel first!');
        }

        // Join and play lofi mix
        voiceChannel.join().then(connection => {
            const stream = ytdl("https://www.youtube.com/watch?v=-FlxM_0S2lA&t=3s", {
                filter: 'audioonly',
            });
            const dispatcher = connection.play(stream, { volume: globalBotVolume })
            dispatcher.on('end', () => voiceChannel.leave());
        });
    }

    // Plays from an asortment of mixes
    if (command == "mix") {
        if (message.channel.type !== 'text') return;
        if (!message.member.voice.channel) {
            return message.reply('please join a voice channel first!');
        }

        voiceChannel.join().then(connection => {
            const randomMix = mixes[Math.floor(Math.random() * mixes.length)];
            // play a random mix from my list
            const stream = ytdl(randomMix, {
                filter: 'audioonly',
            });
            const dispatcher = connection.play(stream, { volume: globalBotVolume });

            dispatcher.on('end', () => voiceChannel.leave());
        });

    }
    // Check to see if the command matches one of the sound files
    if (voiceCommands.includes(command)) {
        try {
            const connection = await message.member.voice.channel.join();

            soundFiles.forEach(i => {
                let soundFileCommand = i.replace('.mp3', '');
                let soundFilePath = `./assets/${i}`;
                if (command === soundFileCommand) {
                    const dispatcher = connection.play(soundFilePath, { volume: globalBotVolume });
                    playSound(soundFilePath, connection, dispatcher);
                }
            });
        } catch (e) {
            message.channel.send("Either you aren't in a channel. Or this bot fucking died. ☠️");
            console.log(e);
        }
    }
});


client.on('voiceStateUpdate', async message => {
    
    if (message.member.user.id === globalBotId) {
        return;
    } else if (message.member.voice.channel) {
        const file = 'assets/yo.mp3';
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(file, { volume: globalBotVolume });

        playSound(file, connection, dispatcher);
    }

});

client.login(token);
