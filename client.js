const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json'); //fetching and saving token

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  //Bot will listen for '!' to begin parsing commands
  if (msg.substring(0,1) == '!')  {

    //Declaring array variable to catch multiple prompts with various properties
    var args = msg.substring(1).split(' '); //splits command at every space and creates array
    console.log(args); //prints the command on console screen
    var cmd = args[0]; //assigns command mark to cmd
    console.log(cmd); //prints cmd for debugging purposes

  }
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(auth.token);

//Start
