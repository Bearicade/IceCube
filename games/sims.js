const fs = require("fs");
const config = require("../config.json");

playSim1 = function(msg, args){
	let index = 0;
	
	switch(args[index]){
		case 'check':
			index++;
			switch(args[index]){
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
			index++;
			switch(args[index]){
				
				case 'a':
				case 'job':
				
				break;
				case 'cash':
				case 'money':
				case 'coins':
				case 'coin':
					index++;
					switch(args[index]){
						
						case 'on':
						case 'in':
						index++;
						switch(args[index]){
							
							case 'ground':
							case 'floor':
							index++;
							
							break;
							case 'pool':
							case 'beach':
							case 'water':
							case 'pond':
							index++;
							
							break;
						}
						break;
					}
				
				break;
				case 'loot':
				case 'items':
				case 'item':
					index++;
					switch(args[index]){
						
						case 'on':
						case 'in':
						index++;
						switch(args[index]){
							
							case 'ground':
							case 'floor':
							index++;
							
							break;
							case 'pool':
							case 'beach':
							case 'water':
							case 'pond':
							index++;
							
							break;
							case 'strangers':
							case 'stranger\'s':
								index++;
								switch(args[index]){
									
									case 'pocket':
									index++;
										msg.channel.send("Is that a quarter or are they happy to see you?");
									break;
									case 'backpack':
									index++;
										msg.channel.send("You got a waterbottle");
									break;
									case 'purse':
									index++;
										msg.channel.send("You got slapped");
									break;
									case 'wallet':
										index++;
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
			index++;
			switch(args[index]){
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