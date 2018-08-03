const fs = require("fs");

//msg.member.id

playJackpot = function(msg, cmd, args){
		console.log('Jackpot!');
		var bet = parseInt(args[0]);
		var bank;
		var gamefile = fs.open("./userdata/"+msg.member.id+".txt", 'a', (err, fd) => {
			if (err) {
				if (err.code === 'ENOENT') {
					console.error('myfile does not exist');
					return;
				}
				throw err;
			}
			fs.readFile("./userdata/"+msg.member.id+".txt", 'utf8', function(err, data) {
				if (err) throw err;
				//console.log("dat:"+data);
				if (isNaN(parseInt(data))){
					var bank = 100;
				}else{
					var bank = parseInt(data);
				}
				var num1 = Math.ceil(Math.random() * 3);
				var num2 = Math.ceil(Math.random() * 3);
				var num3 = Math.ceil(Math.random() * 3);
				msg.channel.send(`${msg.member} rollss | `+num1+" | "+num2+" | "+num3+" | ");
				if(num1==num2 && num2==num3){
					msg.channel.send("You win! You earned "+bet*2+" badger coins!");
					bet= bet*2;
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
