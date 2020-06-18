'use strict';
require('dotenv').config(); 
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const token  = process.env.CLIENT_TOKEN;
const soundFiles = fs.readdirSync('./assets').filter(file => file.endsWith('.mp3'));


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
  }

const exampleEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('Welcome to the help menu!')
.setURL('https://youtu.be/dQw4w9WgXcQ')
.setDescription('Here is how we can help')

.addFields(
    { name: 'Option 1', value: 'Go fuck yourself 🖕🏼' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Option 2', value: '```telnet towel.blinkenlights.nl```', inline: true },
    { name: 'Option 3', value: 'Go fuck yourself 🖕🏼', inline: true },
)



// When the application starts, this is required...
client.on('ready', () => {
    console.log('I am ready!');

});

// This section processes all messages
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
    
	if (command === 'ping') {
        message.channel.send('!ping');
    
        message.channel.send("poop")
	} else if (command === 'beep') {
		message.channel.send('Boop.');
    }

    // other commands...
});

// reacts when bruh is seen
client.on('message' , message => {
    const textContent = message.content;
    if (textContent.includes('bruh')){

        let userId = message.author['id'];
        if (userId != 344885974636953600){
            return
        }else {
            // Since we use a custom emoji - this looks for the id, based of the name 'bruh'
            const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'bruh');
            message.react(emoji);
        }
       

    }
})

// Curb your enthusiasm
client.on('message', async message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'help'){
        message.channel.send("for help please use `sudo help`")
    }
    if (command === "sudo"){
        if (args[0] === "help"){
            message.channel.send(exampleEmbed);
        }
    }

    if (command == "curb"){
        const file = 'assets/curb.mp3';
        
        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.2 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "sans"){
        const file = 'assets/sans.mp3';
        
        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file);
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "crazy"){
        const file = 'assets/crazy.mp3';
        
        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file,  { volume: 0.5 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "bruh"){
        const file = 'assets/bruh.mp3';

        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "kill"){
        message.member.voice.channel.leave()
        // const connection = await message.member.voice.channel.join();
        // connection.disconnect(); 

    }
});

// Play yoooo when someone joins
client.on('voiceStateUpdate', async message => {
    if (message.id === 721451200125468813) {
        console.log(message.id)
        return
    } else {
        if (message.member.voice.channel) {
    
        let isDeaf = message.selfDeaf;
        let isMute = message.selfMute;
        console.log(`am i deaf: ${isDeaf}`)
        console.log(`am i mute: ${isMute}`)
        if (isDeaf === true){
            console.log("Deafened...")
        } else if (isMute === true) {
            console.log("Muted...")
        } else {
            const file = 'assets/yo.mp3';
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            
            playSound(file, connection, dispatcher)
        }

        
    
    }
}
});



client.login(token);