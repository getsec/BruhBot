module.exports = {
	name: 'conch',
	description: 'Seal your rl fate!',
	execute(message, args) {
        resps =[
            "As I see it, yes.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don’t count on it.",
            "It is certain.",
            "It is decidedly so.",
            "Most likely.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Outlook good.",
            "Reply hazy, try again.",
            "Signs point to yes.",
            "Very doubtful.",
            "Without a doubt.",
            "Yes.",
            "Yes – definitely.",
            "You may rely on it."]
            const randomElement = resps[Math.floor(Math.random() * array.length)];
            let response = `**Your rocket league fate**: ${randomElement} \n:red_car:`
		message.channel.send(response);
	},
};