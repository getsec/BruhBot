module.exports = {
    name: 'ip',
    description: 'Gets ip',
    execute(message) {
        const request = require("request");
        request("http://www.ipinfo.io", function(error, response, body) {
            message.channel.send(` \`\`\`${body}\`\`\` `);
        });

    },
};