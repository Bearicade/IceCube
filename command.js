const media = require("./media.json");

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
                msg.channel.send(media.exits[(Math.floor(Math.random() * (media.exits.length - 1)))]);
                client.destroy();
                break;

            case 'list':
                msg.channel.send("```These are my current commands:\n\n" +
                "Ping: Pong!\n" +
                "Marco: Polo!\n" +
                "Roll [#]: Rolls a random number within the specified parameter.\n" +
                "Joke: Gives you a very bad joke probably.\n" +
                "Kill: Would you do such a thing?\n" + "```");
                break;

            case 'joke':
                msg.channel.send(media.jokes[(Math.floor(Math.random() * (media.jokes.length - 1)))]);
                break;

            case 'roll':
                if (isNaN(parseInt(args[0]))) {
                    msg.channel.send("Invalid entry. Please enter number after " + prefix + "roll.");
                } else {
                    msg.channel.send(Math.floor(Math.random() * args[0]));
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
