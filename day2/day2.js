const fs = require('fs');


const main = () => {
	const numbers = fs.readFileSync('day2.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split('\n').filter(n => n).map(n => {
		const [o, l, t] = n.split(' ');
		const occurrances = o.split('-').map(x => parseInt(x, 10)-1);
		const letter = l[0];
		const text = t;
		return [occurrances, letter, text];
	});

	const result = list.reduce((acc, next) => {
		const [occurrances, letter, text] = next;
		// const matches = (text.match(new RegExp(letter, "g")) || []).length;
		// if (matches >= occurrances[0] && matches <= occurrances[1]) {
		// 	return acc + 1;
		// }
		
		if (text[occurrances[0]] === letter && text[occurrances[1]] !== letter) {
			return acc + 1;
		}

		if (text[occurrances[0]] !== letter && text[occurrances[1]] === letter) {
			return acc + 1;
		}

		return acc;
	}, 0);
	
	console.log(result);
}

main();
