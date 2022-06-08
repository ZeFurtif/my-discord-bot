const Discord = require('discord.js');
const client = new Discord.Client();
var { readdirSync } = require('fs');

client.config = require('./config.js');
client.commands = new Discord.Collection();



for (const file of readdirSync('./commands/')) {
    if (!file.endsWith(".js")) break;
    var fileName = file.substring(0, file.length - 3);

    var fileContents = require(`./commands/${file}`);
    client.commands.set(fileName, fileContents);
}



for (const file of readdirSync('./events/')) {
    if (!file.endsWith(".js")) break;
    var fileName = file.substring(0, file.length - 3);

    var fileContents = require(`./events/${file}`);

    client.on(fileName, fileContents.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
}

client.login(client.config.token)
    .then(() => {
        if (!client.user.bot) { console.log("[JPBTips] Don't self bot idot"); return process.exit() };
        console.log(`Client logged in as ${client.user.tag}`);
    })
    .catch((err) => {
        console.error("Error while logging in: " + err);
        if (err.toString().match(/incorrect login details/gi)) console.log("[JPBTips] | Make sure to change up your config!");
    });