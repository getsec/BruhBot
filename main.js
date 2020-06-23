'use strict';
require('dotenv').config(); 
const chalk = require('chalk');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const token  = process.env.CLIENT_TOKEN;
const globalBotVolume = 0.4
const soundFiles = fs.readdirSync('./assets').filter(file => file.endsWith('.mp3'));
const voicecommands = []

soundFiles.forEach(i => {
    voicecommands.push(i.replace('.mp3',''))
});

function logger (msg) {
    fs.appendFile('log.txt', '\n' + msg, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}


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
client.on("ready", function(){
    let tag = client.user.tag
    let clientSize = client.user.size
    console.log(`${chalk.greenBright('We have launched succesfully')}.`);
	console.log(`Logged in as: ${chalk.yellow(tag)}!`);
	
  	client.user.setActivity("your gf's heart 🤡");
	client.generateInvite(['SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE'])
	.then(link => {
		console.log(`Invite Link:  ${chalk.magentaBright(link)}`);
		let inviteLink = link;
	});
});


// Menu to loop through sounds and play them
client.on('message', async message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    // this will remove the bot from a voice channel if it gets annoying.
    if (command == "kill"){
        message.member.voice.channel.leave()
    } else if (command == 'help'){
        const helpEmbedMessage = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Welcome to the help menu!')
        .setURL('https://youtu.be/dQw4w9WgXcQ')
        .setDescription(`Whats up, buttercup!`)

        .addFields(
            { name: 'Main Function', value: 'Every time you join a channel, you will get greeted with a CJ "yoooo"' },
            { name: 'Play some funny sounds', value: `Make sure you are joined to a channel, and user the ! prefix and a name of a sound. The current set of sounds are: ${voicecommands}` },
        )
        message.channel.send(helpEmbedMessage);
    } else {
        try {
            const connection = await message.member.voice.channel.join();
            
            soundFiles.forEach(i => {
                let soundFileCommand = i.replace('.mp3', '')
                let soundFilePath = `./assets/${i}` 
                if (command === soundFileCommand){
                    const dispatcher = connection.play(soundFilePath, { volume: globalBotVolume });
                    playSound(soundFilePath, connection, dispatcher) 
                } 
            })
        } catch (e) {
            message.channel.send("Either you aren't in a channel. Or this bot fucking died. ☠️")
            console.log(e)
        } 
    }
});

client.on('voiceStateUpdate', async message => {
    
    if (message.id === 721451200125468813) {
        console.log(message.id)
        return
    } else {
        if (message.member.voice.channel) {
    
        let isDeaf = message.selfDeaf;
        let isMute = message.selfMute;
        let srvMute = message.serverMute;
        let srvDeaf  = message.serverDeaf;


        console.log(`am i deaf: ${isDeaf}`)
        console.log(`am i mute: ${isMute}`)
        console.log(`srv deaf: ${srvDeaf}`)
        console.log(`srv mute: ${srvMute}`)
       
        if (isDeaf === true){
            console.log("Deafened...")
        } else if (isMute === true) {
            console.log("Muted...")
        } else {
            const file = 'assets/yo.mp3';
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: globalBotVolume });
            
            playSound(file, connection, dispatcher)
        }

        
    
    }
}
});

client.login(token);