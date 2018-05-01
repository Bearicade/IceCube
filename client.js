const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json'); //fetching and saving token
const config = require('./config.json'); //fetching config information

require('./command.js')();

client.on('ready', () => { //prints to console when logged in and sets playing status
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity(`I am your bot!`);
});

client.on('disconnect', () => {
    console.log(`${client.user.tag} has logged out.`);
});

client.on('guildMemberAdd', member => {
  member.addRole(config.initRole[0])  //puts user into level one role
  .then(console.log)
  .catch(console.error);

  member.guild.channels.find('name', 'bot-prompt') //welcomes user
  .send('Welcome to ' + config.server +
  `, ${member}., You are now one of our ` +
  config.initRole[1] + '!');
});

client.on('message', msg => {

  if (msg.author.bot) return;
  if (msg.content.indexOf(config.prefix) !== 0) return;

  //Declaring array variable to catch multiple prompts with various properties
  var args = msg.content.substring(1).split(' '); //splits command at every space and creates array
  var cmd = args.shift().toLowerCase(); //removes and returns first item; convert to lowercase

  //Prints args and cmd to console for debugging
  console.log("args[]: " + args);
  console.log("command: " + cmd);

  runCommand(config.prefix, client, msg, cmd);
});

client.login(auth.token);

//Start
