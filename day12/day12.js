const fs = require('fs');


const main = () => {
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n/).filter(n => n).map((r, i) => {
		return r;
	});

	let currentDirection = 'E';
	let currentDirectionMap = {
		'N': 0,
		'E': 90,
		'S': 180,
		'W': 270
	};
	let currentPosition = [0,0];
	let waypointPosition  = [10,1];

	const changeWaypointDirection = (adj, amount) => {
		const [x, y] = waypointPosition;
		if (adj === 'L') {
			if (amount === 90) {
				waypointPosition = [-y, x];
			} else if (amount === 270) {
				waypointPosition = [y, -x];
			}
		} else {
			if (amount === 90) {
				waypointPosition = [y, -x];
			} else if (amount === 270) {
				waypointPosition = [-y, x];
			}
		} 

		if (amount === 180) {
			waypointPosition = [-x, -y];
		}
	};


	const changeDirection = (adj, amount) => {

		const n = adj === 'L' ? -amount : amount;
		const current = currentDirectionMap[currentDirection];
		const next = current + n;
		const o = next < 0 ? 360 - Math.abs(next) : next;
		const p = o > 360 ? o - 360 : o;

		if (p === 0 || p === 360) {
			currentDirection = 'N';
		} else if (p === 90) {
			currentDirection = 'E';
		} else if (p === 180) {
			currentDirection = 'S';
		} else if (p === 270) {
			currentDirection = 'W';
		}
	}

	const move = (type, amount) => {
		const [x, y] = currentPosition;
		switch(type) {
			case 'W':
				currentPosition = [x-amount, y];
				break;
			case 'E':
				currentPosition = [x+amount, y];
				break;
			case 'N':
				currentPosition = [x, y+amount];
				break;
			case 'S':
				currentPosition = [x, y-amount];
				break;
			case 'L':
			case 'R':
				changeDirection(type, amount);
				break;
			case 'F':
				move(currentDirection, amount);
				break;
		}
	}

	const moveShip = amount => {
		const [x, y] = currentPosition;
		const [x1, y1] = waypointPosition;
		const [nx, ny] = [x+(amount*x1), y+(amount*y1)];
		currentPosition = [nx, ny];
	};

	const move2 = (type, amount) => {
		const [x, y] = waypointPosition;
		switch(type) {
			case 'W':
				waypointPosition = [x-amount, y];
				break;
			case 'E':
				waypointPosition = [x+amount, y];
				break;
			case 'N':
				waypointPosition = [x, y+amount];
				break;
			case 'S':
				waypointPosition = [x, y-amount];
				break;
			case 'L':
			case 'R':
				changeWaypointDirection(type, amount);
				break;
			case 'F':
				moveShip(amount);
				break;
		}
	}


	list.forEach(command => {
		console.log(command, currentPosition, waypointPosition);
		const [ type, ...n ] = command.split('');
		const amount = parseInt(n.join(''), 10);

		move2(type, amount);
	});

	


	console.log(Math.abs(currentPosition[0]) + Math.abs(currentPosition[1]));
	console.log(currentPosition);



}



main();
