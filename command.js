function runCommand(cmd)  {

  //Start comparing and analyzing commands
  //Switch cases are temporary; implement only small processes
  switch (cmd)  {
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
    case 'exit':
      msg.channel.send("Disconnecting...");
      client.destroy();
    break;

    case 'list':
      msg.channel.send("```These are my current commands:\n" +

      "```");
    break;

    //Default reply, unrecognized command
    default:
      msg.channel.send("Sorry, I don't know that command. " +
      "Type `" + prefix + "list` for a list of commands.");
  }
}
