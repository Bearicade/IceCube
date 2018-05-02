const media = require("./media.json");
const config = require("./config.json");

module.exports = function () {
    this.runCommand = function (prefix, client, msg, cmd, args) {

        //Start comparing and analyzing commands
        //Switch cases are temporary; implement only small processes
        switch (cmd) {

            //For fun, text responses
            case 'ping':
                msg.channel.send("Pong!");
                break;

                //Destroy the bot, but not really
            case 'destroy':
                msg.channel.send("Bye bye!");
                client.destroy();
                break;

                //Disconnecting the client
            case 'kill':
                if (msg.member._roles.includes(config.adminRole[0])) {
                    msg.channel.send(media.exits[(Math.floor(Math.random() * (media.exits.length - 1)))]);
                    client.destroy();
                }
                break;

            case 'list':
                msg.channel.send("```These are my current commands:\n\n" +
                "- ping: Pong!\n" +
                "- marco: Polo!\n" +
                "- roll [#]: Rolls a random number within the specified parameter.\n" +
                "- joke: Gives you a very bad joke, probably.\n" + "```");
                break;

            case 'joke':
                msg.channel.send(media.jokes[(Math.floor(Math.random() * (media.jokes.length - 1)))]);
                break;

            case 'roll':
                if (isNaN(parseInt(args[0]))) {
                    msg.channel.send("Invalid entry. Please enter number after " + prefix + "roll.");
                } else {
                    msg.channel.send(Math.ceil(Math.random() * args[0]));
                }
                break;

            case 'boneless':
                msg.channel.send("**B O N E L E S S**");
                break;

                //Default reply, unrecognized command
            default:
                msg.channel.send("Sorry, I don't know that command. " +
                "Type `" + prefix + "list` for a list of commands.");
        }
    }


}
