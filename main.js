require('dotenv').config();
let chalk = require('chalk');
// let playSound =  require('./playsound');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const token = process.env.CLIENT_TOKEN;
const version = '1.2';
const globalBotVolume = 0.4;

const voiceCommands = [];
const ytdl = require('ytdl-core');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const soundFiles = fs.readdirSync('./assets').filter(file => file.endsWith('.mp3'));
client.commands = new Discord.Collection();

// Create a list of commands from the commands directory
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// Map commands to sound files for comands later
soundFiles.forEach(i => {
    voiceCommands.push(i.replace('.mp3', ''));
});


const playSound = async (file, connection, dispatcher) => {
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
client.on("ready", function () {
    let tag = client.user.tag;
    let id = client.user.id;
    console.log(`${chalk.greenBright('We have launched succesfully')} with ID ${id}. `);
    console.log(`Logged in as: ${chalk.yellow(tag)}!`);

    client.user.setActivity("with cams balls UwU");
    client.generateInvite(['SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE'])
        .then(link => {
            console.log(`Invite Link:  ${chalk.magentaBright(link)}`);
            console.log(`Version num:  v${chalk.magentaBright(version)}`);
            let inviteLink = link;
        });
});


// Menu to loop through sounds and play them
client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === "kill") {
        message.member.voice.channel.leave();
    }
    // this will remove the bot from a voice channel if it gets annoying.
    if (command === "ping") {
        client.commands.get('ping').execute(message, args);
    }
    else if (command === "homies") {
        message.guild.members.fetch().then(fetchedMembers => {
            const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
            // We now have a collection with all online member objects in the totalOnline variable
            message.channel.send(`There are currently ${totalOnline.size} homies!`);
        });
    }
    else if (command === "ip") {
        client.commands.get('ip').execute(message);
    }
    else if (command === "help") {
        client.commands.get('help').execute(message, version);
    }
    else if (command === "lofi") {
        let channelType = message.channel.type;
        let currentVoiceChannel = message.member.voice.channel;
        client.commands.get('lofi').execute(channelType, currentVoiceChannel, globalBotVolume);
    }
    else if (command == "mix") {
        let channelType = message.channel.type;
        let currentVoiceChannel = message.member.voice.channel;
        client.commands.get('mix').execute(channelType, currentVoiceChannel, globalBotVolume);
    }
    else if (command === "sounds") {
        client.commands.get('sounds').execute(message, voiceCommands);
    }
    // Check to see if the command matches one of the sound files
    else if (voiceCommands.includes(command)) {
        // If the user isn't in a voice channel
        if (message.member.voice.channel == null) {
            message.channel.send("Ayy, you arent in a channel. It's also a possibility that nathan fucked this bot up so bad this feature doesnt work anymore. Good luck... ☠️");
        } else {
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
                message.channel.send(e);
                console.log(e);
            }
        }

    }
});


client.on('voiceStateUpdate', async (oldMember, newMember) => {
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;
    console.log(`channels (old|new):  ${oldUserChannel} | ${newUserChannel}`)

    // If the oldChannel that the user was in is null, and the new channel exists. Execute sound.
    if (newUserChannel !== undefined && (oldUserChannel === undefined || oldUserChannel === null)) {
        const file = 'assets/yo.mp3';
        const connection = await newMember.channel.join();
        const dispatcher = connection.play(file, { volume: globalBotVolume });
        playSound(file, connection, dispatcher);
    }

});

client.login(token);