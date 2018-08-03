const fs = require("fs");

//msg.member.id

playJackpot = function(msg, cmd, args){
	console.log('Jackpot!');
	let bet = parseInt(args[0]);
	/*we will try to use 'var' if we need the variable for the duration of
	the bot's current life. we will use 'let' if we only need the variable
	for the duration of one command*/
	let bank;
	let gamefile = fs.open("./userdata/"+msg.member.id+".txt", 'a', (err, fd) => {
		if (err) {
			if (err.code === 'ENOENT') {
				console.error('file does not exist');
				return;
			}
			throw err;
		}
		fs.readFile("./userdata/"+msg.member.id+".txt", 'utf8', function(err, data) {
			if (err) throw err;
			//console.log("dat:"+data);
			if (isNaN(parseInt(data))){
				bank = 100;
			}else{
				bank = parseInt(data);
				if (bank<=0){
					msg.channel.send("Insufficient funds, you'll have to find a job first.");
					return;
				}
			}
			let num1 = Math.ceil(Math.random() * 3);
			let num2 = Math.ceil(Math.random() * 3);
			let num3 = Math.ceil(Math.random() * 3);
			msg.channel.send(`${msg.member} spun a [ `+num1+" ][ "+num2+" ][ "+num3+" ] ");
			if(num1==num2 && num2==num3){
				msg.channel.send("You win "+bet*10+" badger coins!");
				bet= bet*10;
			}else{
				msg.channel.send("You lost "+bet+" badger coins!");
				bet= -bet;
			}

			bank = bank + bet;
			//console.log("bank:"+bank);
			//console.log("bet:"+bet);
			msg.channel.send("You have "+bank+" badger coins now.");



			fs.truncate("./userdata/"+msg.member.id+".txt", 0, function() {
				fs.writeFile(fd, bank+"\r\n", 'utf8', (err) => {
					fs.close(fd, (err) => {
						if (err) throw err;
					});
					if (err) throw err;
				});
			});

		});
	});
}
