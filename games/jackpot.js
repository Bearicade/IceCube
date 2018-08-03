const fs = require("fs");

//msg.member.id

playJackpot = function(msg, cmd, args){
		console.log('Jackpot!');
		var bet = parseInt(args[0]);
		fs.readFile("./userdata/"+msg.member.id+".txt", 'utf8', function(err, data) {
			if (err) throw err;
			console.log(data);
		});
		var num1 = Math.ceil(Math.random() * 12);
		var num2 = Math.ceil(Math.random() * 12);
		var num3 = Math.ceil(Math.random() * 12);
		msg.channel.send(`${msg.member} rollss | `+num1+" | "+num2+" | "+num3+" | ");
		if(num1==num2==num3){
			msg.channel.send("You win!\r\nYou earned "+bet+" badger coins!");
			bet= bet;
		}else{
			msg.channel.send("You lost "+bet+" badger coins!");
			bet= -bet;
		}
		var gamefile = fs.open("./userdata/"+msg.member.id+".txt", 'a', (err, fd) => {
			if (err) throw err;
			fs.writeFile(fd, bet+"\r\n", 'utf8', (err) => {
				fs.close(fd, (err) => {
					if (err) throw err;
				});
				if (err) throw err;
			});
		});
}
