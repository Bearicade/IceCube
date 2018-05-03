const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json'); //fetching and saving token
const config = require('./config.json'); //fetching config information
const fs = require('fs');

require('./command.js')();

client.on('ready', () => { //prints to console when logged in and sets playing status
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity(`I am your bot!`);
});

client.on('disconnect', () => {
    console.log(`${client.user.tag} has logged out.`);
});

//Puts a new user into level one role from the ID given in config.json
client.on('guildMemberAdd', member => {
  console.log(`\n${member.user.username} has joined the server.`);

  member.addRole(config.initRole[0])/*
  .then(console.log)
  .catch(console.error)*/;

  //Create a file for the user
  fs.appendFile('./userdata/' + member.user.username, "", (err) => {
    if (!err) return;
    console.error(err);
  });

  //Welcomes user an finds the channel using member properties
  member.guild.channels.find('name', config.channel[0])
  .send('Welcome to ' + config.server + `, ${member}. You are now one of our ` + config.initRole[1] + '!');
});

//removes user file when they leave server
client.on('guildMemberRemove', member => {
    fs.unlink('./userdata/' + member.user.username, (err) => {
      if (!err) return;
      console.error(err);
    });
});

client.on('message', msg => {

  if (msg.author.bot) return;
  if (msg.content.indexOf(config.prefix) !== 0) return;

  //Declaring array variable to catch multiple prompts with various properties
  var args = msg.content.substring(1).split(' '); //splits command at every space and creates array
  var cmd = args.shift().toLowerCase(); //removes and returns first item; convert to lowercase

  //Prints user, args, and cmd to console for debugging
  console.log("\nuser: " + `${msg.author.username}`);
  console.log("args[]: " + args);
  console.log("command: " + cmd);

  runCommand(config.prefix, client, msg, cmd, args);
});

client.login(auth.token);

//Start
