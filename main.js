'use strict';
require('dotenv').config(); 
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const token  = process.env.CLIENT_TOKEN;
const soundFiles = fs.readdirSync('./assets').filter(file => file.endsWith('.mp3'));
const voicecommands = []
soundFiles.forEach(i => {
    voicecommands.push(i.replace('.mp3',''))
});
console.log(voicecommands)
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
.setDescription(`Available sounds: ${voicecommands}`)

.addFields(
    { name: 'Main Function', value: 'Every time you join a channel, you will get greeted with a CJ "yoooo"' },
    { name: 'Play some funny sounds', value: 'Make sure you are joined to a channel, and user the ! prefix and a name of a sound.' },
)



// When the application starts, this is required...
client.on('ready', () => {
    console.log('I am ready!');

});


// reacts when bruh is seen
client.on('message' , message => {
    const textContent = message.content;
    if (textContent.includes('bruh')){

        try {

        
        let userId = message.author['id'];
        if (userId != 344885974636953600){
            return
        }else {
            // Since we use a custom emoji - this looks for the id, based of the name 'bruh'
            const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'bruh');
            message.react(emoji);
        }
    } catch (e) {
        message.channel.send('Sorry, I couldnt find that emoji on this channel');
    }
       

    }
})

// Play sound
client.on('message', async message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'help'){
        message.channel.send(exampleEmbed);
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
    if (command == "noice"){
        const file = 'assets/noice.mp3';

        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "9000"){
        const file = 'assets/9000.mp3';

        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "deez"){
        const file = 'assets/deez.mp3';

        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "doit"){
        const file = 'assets/doit.mp3';

        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "horrible"){
        const file = 'assets/horrible.mp3';

        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "triple"){
        const file = 'assets/triple.mp3';

        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "windowz"){
        const file = 'assets/windowz.mp3';

        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "windoze95"){
        const file = 'assets/windoze95.mp3';

        try {
            const connection = await message.member.voice.channel.join();
            const dispatcher = connection.play(file, { volume: 0.4 });
            playSound(file, connection, dispatcher) 
        } catch (e){
            message.channel.send('Bruh - to play a sound you need to be in a channel...');
        }
    }
    if (command == "wombo"){
        const file = 'assets/wombo.mp3';

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