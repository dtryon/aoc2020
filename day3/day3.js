const fs = require('fs');


const main = () => {
	const numbers = fs.readFileSync('day3.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split('\n').filter(n => n);

	const width = list[0].length;
	let current = 0;
	let trees = 0;
	const right = 1;
	const down = 2;
	
	for (let i = 0; i < list.length; i = i + down) {
		const row = list[i];
		if(row[(current % width)] === '#') {
			trees++;
		}
		current += right;
	}

	console.log(trees);
	console.log(57 * 252 * 64 * 66 * 43);
}

main();
