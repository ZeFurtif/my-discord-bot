var config = {
    token: "", // Replace this with you bot account's token. | https://discordjs.guide/preparations/setting-up-a-bot-application.html
    prefix: "**", // Replace this with the character that goes before all of your commands.
    statusMessage: "prefix : **", // Replace this with the status message you want for your bot. (The "Playing video games" under the bots name). More customization: https://discord.js.org/#/docs/main/stable/typedef/PresenceData (Just edit the ready.js if you are going to do this).
    dbltoken: undefined // You do not have to change this! Look at the bottom of the /events/ready.js file for more info on what this is for if you're interested in advertising your bot!
}

module.exports = config; // Put's new config object as export.