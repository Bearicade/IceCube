const fs = require("fs");
const config = require("../config.json");

//msg.member.id

playJackpot = function(msg, args){
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
				msg.channel.send("You win "+bet*10+config.currency);
				bet= bet*10;
			}else{
				msg.channel.send("You lost "+bet+config.currency);
				bet= -bet;
			}

			bank = bank + bet;
			//console.log("bank:"+bank);
			//console.log("bet:"+bet);
			msg.channel.send("You have "+bank+config.currency+" now.");



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

printPoints = function(msg)	{
	let bank;
	fs.readFile("./userdata/" + msg.member.id + ".txt", 'utf8', function(err, data) {
		if (err) {
			console.log(`\n${msg.author.username} does not have a bank yet.`);
			bank = 100;
			fs.appendFile('./userdata/' + msg.author.id + '.txt', bank + "\r\n", (err) => {
				if (!err) return; //if callback does not return error, continue
				console.error(err); //print to console if error occurs
			});
			console.log(`${msg.author.username} now has a bank of ` + bank + config.currency);
		} else {
			bank = parseInt(data);
		}
		msg.channel.send("You have "+ bank +config.currency);
	});
};
