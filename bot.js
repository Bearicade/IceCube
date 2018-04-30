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
//dirty code
process.on('SIGTERM', function onSigterm() {
    console.info('Got SIGTERM. Graceful shutdown start', new Date().toISOString())
    // start graceul shutdown here
    server.close(function onServerClosed(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        closeMyResources(function onResourcesClosed(err) {
            // error handling
            process.exit();
        })
    })
})



bot.on('message', function (user, userID, channelID, message, evt) {
    //array containing all the commands
    var commandlist = ['marco','randint','joke']
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'marco':
                bot.sendMessage({
                    to: channelID,
                    message: 'Polo!'
                });
            break;
                // Just add any case commands if you want to..
            case 'joke':
                var jokelist = ['What do you get when you cross a joke with a rhetorical question?', 'A man walks into a library and asks, "Can I have a cheeseburger?" The librarian says, "Sir, this is a library." The man whispers, "Can I have a cheeseburger?"','I told the doctor I broke my arm in two places. He told me not to go into those places.','What time did the man go to the dentist? Tooth hurt-y.',"Did you know the first French fries weren't actually cooked in France? They were cooked in Greece.",'If you see a robbery at an Apple Store does that make you an iWitness?','A ham sandwich walks into a bar and orders a beer. The bartender says, "Sorry we don’t serve food here."'];
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
     }
});
