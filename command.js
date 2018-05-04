var media = require("./media.json");
const config = require("./config.json");

module.exports = function () {
  this.runCommand = function (prefix, client, msg, cmd, args) {

    //Start comparing and analyzing commands
    //Switch cases are temporary; implement only small processes
    switch (cmd) {

      case 'list':  //lists the public commands
      msg.channel.send("```These are my current commands:\n\n" +
      "- ping: Pong!\n" +
      "- marco: Polo!\n" +
      "- hello: Say hi to the bot!\n" +
      "- roll [#]: Rolls a random number within the specified parameter.\n" +
      "- joke: Gives you a very bad joke probably.\n" + "```");
      break;

      case 'destroy': //Destroy the bot, but not really
      case 'kill':  //Disconnecting the client
      if (msg.member._roles.includes(config.adminRole[0])) {
        msg.channel.send(media.exits[
          (Math.round(Math.random() * (media.exits.length - 1)))
        ]);
        client.destroy();
      } else {

        switch (msg.member._roles[0]) { //kill command will reference the roles
          case config.initRole[0]:  //in case of lowest level role
          for (var i = 0; i < media.failRoleLow.length; i++)  {  //loop through failRoleLow[] to append to exitfails[]
            media.exitfails.push(media.failRoleLow[i]);
          }
          break;

          /*case config.modRole[0]:  //in case of mod level role
          for (i = 0; i < media.failRoleMod.length; i++)  {  //loop through failRoleMod[] to append to exitfails[]
          media.exitfails.push(media.failRoleMod[i]);
        }
        break;*/

        /*case config.foolRole[0]:  //in case of fool level role
        for (i = 0; i < media.failRoleFool.length; i++)  {  //loop through failRoleFool[] to append to exitfails[]
        media.exitfails.push(media.failRoleFool[i]);
      }
      break;*/
    }

    //Will now take the final array and execute
    msg.channel.send(media.exitfails[
      (Math.round(Math.random() * (media.exitfails.length - 1)))
    ]);
  }
  break;

  case 'joke':  //random joke
  msg.channel.send(media.jokes[
    (Math.round(Math.random() * (media.jokes.length - 1)))
  ]);
  break;

  case 'roll':  //roll random number within parameter
  if (isNaN(parseInt(args[0]))) {
    msg.channel.send("Invalid entry. Please enter number after " + prefix + "roll.");
  } else {
    msg.channel.send("`rolled " + Math.ceil(Math.random() * args[0]) + "`");
  }
  break;

  case 'about':   //will fetch about from user file
  msg.channel.send("*command in development...*");
  break;

  //For fun, text responses
  case 'ping':
  msg.channel.send("Pong!");
  break;

  case 'marco':
  msg.channel.send("Polo!");
  break;

  /*case 'pokes': //don't feel good about this command because it mentions people
  case 'poke':
  if (msg.mentions.users.first() && !msg.isMentioned(client.user))  {
    var usersMentioned = [];
    for (var i = 1; i < msg.mentions.users.array().length; i++)  {
      usersMentioned.push(" and " + msg.mentions.users.array()[i]);
    }
    msg.channel.send(`*${msg.member} pokes ${msg.mentions.users.first()}!*` + usersMentioned);
  } else {
    msg.channel.send(`*pokes ${msg.member} back*`);
  }
  break;*/

  case 'gutentag':
  case 'hola':
  case 'greetings':
  case 'greet':
  case 'hello': //takes both 'hi' and 'hello'
  case 'hi':
  msg.channel.send(media.greetings[
    (Math.round(Math.random() * (media.greetings.length - 1)))
  ] + `*${msg.member}!*`);
  break;

  case 'boneless':
  msg.channel.send("**B O N E L E S S**");
  break;

  default:  //default reply, unrecognized command
  msg.channel.send("Sorry, I don't know that command. " +
  "Type `" + prefix + "list` for a list of commands.");
}
}


}
