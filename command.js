var media = require("./media.json");
var profiles = require('./userdata/profiles.json');
const config = require("./config.json");
var gameJackpot = require("./games/jackpot.js")

module.exports = function () {
  runCommand = function (prefix, client, msg, cmd, args) {
    try {
      //Try before throwing error
      //Start comparing and analyzing commands
      //Switch cases are temporary; implement only small processes
      switch (cmd) {

        case 'list':  //lists the public commands
        msg.channel.send("```These are my current commands:\n\n" +
        "- ping: Pong!\n" +
        "- marco: Polo!\n" +
        "- hello: Say hi to me!\n" +
        "- roll [#]: I'll roll a random number within your specified parameter.\n" +
        "- joke: Joke? What joke?\n" +
        "- jackpot [bet]: Gambling is fun, why don't you bet on it?"+"```");
        break;

        case 'destroy': //Destroy the bot, but not really
        case 'kill':  //Disconnecting the client
        case 'die':
        if ((msg.member._roles.includes(config.adminRole[0]||config.devRole[0]))) {
          msg.channel.send(randomFrom(media.exits));
          client.destroy();
        } else {
          switch (msg.member._roles[0]) { //kill command will reference the role of the user who sent the message
            case config.initRole[0]:  //in case of lowest level role: index [0] is roleID
            for (let i = 0; i < media.failRoleLow.length; i++) {  //loop through failRoleLow[] to append to exitfails[]
              media.exitfails.push(media.failRoleLow[i]);
            } break;

            case config.modRole[0]:  //in case of mod level role: index [0] is roleID
            for (i = 0; i < media.failRoleMod.length; i++)  {  //loop through failRoleMod[] to append to exitfails[]
              media.exitfails.push(media.failRoleMod[i]);
            } break;
          }

          //Will now take the final array and execute
          msg.channel.send(randomFrom(media.exitfails));
        }
        break;

        case 'joke':  //random joke
        msg.channel.send(randomFrom(media.jokes));
        break;

        case 'roll':  //roll random number within parameter
        if (isNaN(parseInt(args[0]))) {
          msg.channel.send("Invalid entry. Please enter number after " + prefix + "roll.");
        } else {
          msg.channel.send("`rolled " + Math.ceil(Math.random() * args[0]) + "`");
        } break;

        case 'jackpot':
        if (args <= 0) {
          msg.channel.send("Uh, what?")
          return;
        }
        playJackpot(msg, args);
        break;

        case 'points':
        case 'pts':
        case 'coins':
          printPoints(msg);
        break;

        case 'give': //format >give @user [#]
          msg.channel.send("Command in development");
        break;

        case 'timer':
        if (args[0]=="active"){
          if(timecount==0){
            msg.channel.send("There are no active timers");
          }else{
            for(var a=0;a<timecount;a++){
              msg.channel.send(timelist[a][0] +": "+timelist[a][1]);
            }
          }
        } else if (isNaN(parseInt(args[0]))) {
          msg.channel.send("Invalid entry. Please enter number after " + prefix + "timer.");
        } else {
          msg.channel.send("`Timer set for " + profiles[msg.member.id].alias + ": " + args[0]/*parseInt(args[0])*/+" mins`");
          //timelist[timecount][0] = profiles[msg.member.id].alias;
          //timelist[timecount][1] = args[0];
          //console.log(timelist[0][0]);
          //console.log(timelist[0][1]);
          //timecount++;
          //check the user only has one timer set up; and ring only when theyre online
          msg.channel.send("Just kidding, command in development");
        }
        break;

        case 'intro':
        case 'about':   //will fetch about from user file
        let links = [];
        if ((args[0]===undefined)) {//if no user is provided after about command, the caller about is called

          for (let i = 0; i < profiles[msg.member.id].channels.length; i++) {
            links.push("\n" + profiles[msg.member.id].channels[i]);
          }

          msg.channel.send("**Alias**: " + profiles[msg.member.id].alias +
          "\n**Channel(s)**: " + links + "\n**About**: " + profiles[msg.member.id].about);
        } else {// if a user id is included after about command, the about of the user will be called

          //console.log(msg.mentions.users.first().id);

          for (let i = 0; i < profiles[msg.mentions.users.first().id].channels.length; i++) {
            links.push("\n" + profiles[msg.mentions.users.first().id].channels[i]);
          }

          msg.channel.send("**Alias**: " + profiles[msg.mentions.users.first().id].alias +
          "\n**Channel(s)**: " + links + "\n**About**: " + profiles[msg.mentions.users.first().id].about);
        }
        break;

        case 'write':   //will write intro into user file
        msg.channel.send("*command in development...*");
        break;

        //For fun, text responses
        case 'ping':
        msg.channel.send("Pong!");
        break;

        case 'marco':
        msg.channel.send("Polo!");
        break;

        case 'pokes': //don't feel good about this command because it mentions people
        case 'poke':
        if (msg.mentions.users.first() && !msg.isMentioned(client.user)) {
          /*var usersMentioned = [];
          for (var i = 1; i < msg.mentions.users.array().length; i++)  {
          usersMentioned.push(" and " + msg.mentions.users.array()[i]);
          //}*/
          msg.channel.send("I won't poke them, because the admin told me not to!") //*`*${msg.member} pokes ${msg.mentions.users.first()}!*` + usersMentioned);
        } else {
          msg.channel.send(`*pokes ${msg.member} back*`);
        } break;

        case 'gutentag':
        case 'hola':
        case 'greetings':
        case 'greet':
        case 'hello': //takes both 'hi' and 'hello'
        case 'hi':
        msg.channel.send(randomFrom(media.greetings) + `*${msg.member}!*`);
        break;

        case 'boneless':
        msg.channel.send("**B O N E L E S S**");
        break;

        default:  //default reply, unrecognized command
        msg.channel.send("Sorry, I don't know that command. " +
        "Type `" + prefix + "list` for a list of commands.");
      }
    } catch (err) {//if any error occurs, catch and relay error
      console.error(err.code);
      errorHandle(err, msg);
    }
  }

  errorHandle = function (err, msg) {
    if (err.code === undefined) {
      msg.channel.send("Error: No entry found");
    } else {
      msg.channel.send("Error: unhandled exception " + err.code);
    }
  }

  randomFrom = function (listID)  {
    return listID[(Math.round(Math.random() * (listID.length - 1)))];
  }
}
