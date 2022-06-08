module.exports = (client) => { // Function for when client has logged in.
  if(!client.user.bot) { console.log("[JPBTips] Don't self bot idot (you thought you fixed it)"); return process.exit() }; // See the logic is that if someone is stupid enough to self bot they wont find this //double check
  client.user.setPresence( // Set's presence data to following object \/
    {
      status: "online", // Makes status "online", (Green Bubble).
      afk: false, // Sets AFK to false, even though it's useless on bots....
      game: { // Game object.
        name: client.config.statusMessage, // Set's game name to the statusMessage value of the config file.
        url: null, // Set's the game's URL to null because this is a PLAYING presence.
        type: "PLAYING" // Set's game type to "Playing ..." This is pretty easy to change and cool so here's a doc: https://discord.js.org/#/docs/main/stable/typedef/ActivityType
      }
    }
  );
  // Do whatever else you'd like here!
  /**
   * DBL, Optional!!
   * DBL (Discord Bot List) Is a cool service that you can post your bot on for other users to see and invite!
   * If you're interested in putting your bot on there head to https://discordbots.org and submit your bot!
   * If/When your bot is accepted put the token from the bot page into 
   * 
   * Also check out their documentation; https://discordbots.org/api/docs
   */
  if(client.config.dbltoken) { // If there is no token set it won't do the DBL process.
    const DBL = require('dblapi.js'); // Require the Discord Bot List library.
    const dbl = new DBL(client.config.dbltoken) // Create's new instance of DBLAPI with the DBLToken defined in ./config.js.
    dbl.on('error', (err) => { // Adds event for if DBL ever errors.
      console.error(`Error while posting stats to DBL: ${err.status} | ${err.message}`); // Logs error.
      if(err.status == 401) { // If error was for being unauthorized.
        if(client.config.token == client.config.dbltoken) return console.log("[JPBTips] Your bot token is not your dbltoken. (Read bottom of ready.js for more info otherwise leave 'dbltoken' as undefined).") ; // If the client token & dbl token are the same say that you shouldn't be.
      else console.log("[JPBTips] Your DBL token is incorrect!"); // Just logs if token is incorrect in general.
      }
    })
    dbl.on('posted', () => { // Adds event for when DBL posts successfully
      console.log(`Posted stats to dbl. ${client.guilds.size} servers...`); // Logs when stats are posted and the amount of servers.
    })

    dbl.postStats(client.guilds.size) // Post stats on client startup.
      .then(()=>dbl.emit('posted')) // Emit "posted" if success.
      .catch((err)=>dbl.emit('error',err)); // Emit "error" if an exception occured.
    setInterval(() => { // This will run every x amount of ms.
      dbl.postStats(client.guilds.size) // Post stats every 30 minutes.
        .then(()=>dbl.emit('posted')) // Emit "posted" if success.
        .catch((err)=>dbl.emit('error',err)) // Emit "posted" if success.
    }, 1800000) // Will run every 1800000 or 30 minutes. This is the suggested time you use.
  }
}