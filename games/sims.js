const fs = require("fs");
const config = require("../config.json");

playSim1 = function(msg, args){
	let index = 0;
	
	switch(args[index]){
		index++;
		case 'check':
			switch(args[index]){
				index++;
				case 'status':
				
				break;
				case 'class':
				
				break;
				case 'job':
					msg.channel.send("Everyone doesn't have a job");
				break;
				case 'points':
				case 'coins':
				case 'money':
					msg.channel.send("Too poor to tell you");
				break;
				case 'inv':
				case 'items':
				case 'item':
					msg.channel.send("Nothing");
				break;
				
			}
		break;
		case 'find':
			switch(args[index]){
				index++;
				case 'a':
				case 'job':
				
				break;
				case 'cash':
				case 'money':
				case 'coins':
				case 'coin':
					switch(args[index]){
						index++;
						case 'on':
						case 'in':
						switch(args[index]){
							index++;
							case 'ground':
							case 'floor':
							
							break;
							case 'pool':
							case 'beach':
							case 'water':
							case 'pond':
							
							break;
						}
						break;
					}
				
				break;
				case 'loot':
				case 'items':
				case 'item':
					switch(args[index]){
						index++;
						case 'on':
						case 'in':
						switch(args[index]){
							index++;
							case 'ground':
							case 'floor':
							
							break;
							case 'pool':
							case 'beach':
							case 'water':
							case 'pond':
							
							break;
							case 'strangers':
							case 'stranger\'s':
								switch(args[index]){
									index++;
									case 'pocket':
										msg.channel.send("Is that a quarter or are they happy to see you?");
									break;
									case 'backpack':
										msg.channel.send("You got a waterbottle");
									break;
									case 'purse':
										msg.channel.send("You got slapped");
									break;
									case 'wallet':
										msg.channel.send("You found a driver\' license!");
									break;
								}
							break;
						}
						break;
					}
				break;
			}
		break;
		case 'use':
			switch(args[index]){
				index++;
				case 'cash':
				case 'money':
				case 'coins':
				case 'points':
				
				break;
				case 'item':
				
			}
		break;
		case 'change':
		case 'trade':
		
		break;
		case 'help':
		
		break
	}
}