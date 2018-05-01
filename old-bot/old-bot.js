var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
//var process = new process;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: The dev');
    logger.info(bot.username + ' - (' + bot.id + ')');

});

bot.on('message', function (user, userID, channelID, message, evt) {

    //Array containing all the commands
    var commandlist = ['marco','randint','joke']

	//Bot will listen for '!'
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
		    console.log('args after split: ' + args);

while (args[0] != null)  {
  var cmd = args[0];
  console.log('cmd after assigned args[0]: ' + cmd);
        switch(cmd) {



          case 'boneless':
          bot.sendMessage({
              to: channelID,
              message: '**B O N E L E S S**'
          });
      break;
            // !ping
            case 'marco':
                bot.sendMessage({
                    to: channelID,
                    message: 'Polo!'
                });
            break;
                // Just add any case commands if you want to..
            case 'joke':
                var jokelist = ['What do you get when you cross a joke with a rhetorical question?', 'A man walks into a library and asks, "Can I have a cheeseburger?" The librarian says, "Sir, this is a library." The man whispers, "Can I have a cheeseburger?"','I told the doctor I broke my arm in two places. He told me not to go into those places.','What time did the man go to the dentist? Tooth hurt-y.',"Did you know the first French fries weren't actually cooked in France? They were cooked in Greece.",'If you see a robbery at an Apple Store does that make you an iWitness?','A ham sandwich walks into a bar and orders a beer. The bartender says, "Sorry we don�t serve food here."'];
                var pickjoke = Math.floor(Math.random() * (jokelist.length)-1);
                bot.sendMessage({
                    to: channelID,
                    message: jokelist[pickjoke]
                });
                break;
            case 'randint':
                var rndint = Math.floor(Math.random() * 100);
                bot.sendMessage({
                    to: channelID,
                    message: rndint
                });
                break;

			case 'away':
                bot.sendMessage({
                    to: channelID,
                    message: 'Going away...'
                });

				bot.setPresence( {idle_since: 1} )
				//bot.disconnect();
                break;

				case 'disconnect':
                bot.sendMessage({
                    to: channelID,
                    message: 'Bye bye!'
                });

				bot.disconnect();
                break;

            default:
                bot.sendMessage({
                    to: channelID,
                    message: "Sorry, I don't know that command. Here is a list of commands:\n"
                });
                bot.sendMessage({
                    to: channelID,
                    //var a
                    for(commandlist) {
                        Console.info("out");
                    }
                });
                break;
              }
               args = args.splice(1);

               console.log('args after splice:' + args);
               
        }
     }
});
