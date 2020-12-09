const fs = require('fs');


const main = () => {
	const numbers = fs.readFileSync('day1.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split('\n').filter(n => n).map(n => parseInt(n.trim(), 10));

	const results = list.reduce((acc, next) => {
		return acc.concat(list.reduce((acc2, next2) => {
			const result = list.find(n => n + next + next2 === 2020);

			if (result) {
				acc2.push([next, next2, result]);
			}
			return acc2;
		}, []));
	}, []);
	
	console.log(results[0][0] * results[0][1] * results[0][2]);
}

main();

// part 1
	// const results = list.reduce((acc, next) => {
	// 	const result = list.find(n => n + next === 2020);
	// 	if (result) {
	// 		acc.push([next, result]);
	// 	}
	// 	return acc;
	// }, []);
