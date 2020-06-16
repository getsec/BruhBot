'use strict';
require('dotenv').config(); 
const Discord = require('discord.js');
const client = new Discord.Client();
var express = require("express");
var app = express();
var inquirer = require('inquirer');
const ping = require('./commands/ping')
const prefix = process.env.PREFIX
const token = process.env.CLIENT_TOKEN


client.on('ready', () => {
    console.log('I am ready!');

});

// This section processes all messages
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
    
	if (command === 'ping') {
        message.channel.send('Pong.');
        message.channel.send(args)
	} else if (command === 'beep') {
		message.channel.send('Boop.');
	}
    // other commands...
});

// reacts when bruh is seen
client.on('message' , message => {
    const textContent = message.content;
    if (textContent.includes('bruh')){
        // Since we use a custom emoji - this looks for the id, based of the name 'bruh'
        const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'bruh');
	    message.react(emoji);

    }
})


client.on('voiceStateUpdate', async message => {
    if (message.member.voice.channel) {
        const yoFileName = 'assets/yo.mp3';
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(yoFileName);
        
        // play
        dispatcher.on('start', () => {
            console.log(`${yoFileName} is now playing!`);
        });
        
        // when finished. Close 
        dispatcher.on('finish', () => {
            console.log(`${yoFileName} has finished playing!`);
            connection.disconnect();    
        });

        // Always remember to handle errors appropriately!
        dispatcher.on('error', console.error);

    }
});


client.login(token);