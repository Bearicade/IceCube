const fs = require("fs");
const config = require("../config.json");

sim1 = function(msg, args){
	
	
	switch(args[1]){
		case 'check':
			switch(args[2]){
				case 'status':
				
				break;
				case 'class':
				
				break;
				case 'job':
				
				break;
				case 'points':
				case 'money':
				
				break;
				case 'inv':
				case 'items':
				case 'item':
				
				break;
				
			}
		break;
		case 'find':
			switch(args[2]){
				case 'a':
				case 'job':
				
				break;
				case 'cash':
				case 'money':
				case 'coins':
				case 'coin':
				
				
				break;
				case 'loot':
				case 'items':
				case 'item':
				
				break;
			}
		break;
		case 'use':
			switch(args[2]){
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