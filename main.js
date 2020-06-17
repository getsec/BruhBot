'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();
var express = require("express");
var app = express();
var inquirer = require('inquirer');
const ping = require('./commands/ping') 

require('dotenv').config(); 

const prefix = process.env.PREFIX;
const token  = process.env.CLIENT_TOKEN;

/**
 * Plays a sond on the proper dispatcher.
 * @param {*} file
 * @param {*} connection
 * @param {*} dispatcher
 */
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


// Curb your enthusiasm
client.on('message', async message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
    if (command == "curb"){
        const file = 'assets/curb-your-enthusiasm.mp3';
        
        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file);
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
    if (message.member.voice.channel) {
        const file = 'assets/yo.mp3';
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(file);
        
        playSound(file, connection, dispatcher)
    
    }
});

client.login(token);