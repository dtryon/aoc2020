const fs = require('fs');

// const countDistinct = letters => {
// 	const counts = letters.reduce((acc, next) => {
// 		if (acc[next]) {
// 			return acc;
// 		}
// 		acc[next] = true;
// 		return acc;
// 	}, {});
// 	return Object.keys(counts).length;
// }

const getDistinctLetters = letters => {
	const counts = letters.reduce((acc, next) => {
		if (acc[next]) {
			return acc;
		}
		acc[next] = true;
		return acc;
	}, {});
	return Object.keys(counts);
}

const main = () => {
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n\s*\n/).filter(n => n).map((r, i) => {
		return r.split(/\n/).filter(n => n);
	});

	const combined = list.map(l => l.join('').split('').sort());

	let count = 0;
	for(let i = 0; i < combined.length; i++) {
		const value = combined[i];
		const distinct = getDistinctLetters(value);

		const group = list[i];
		const groupCount = distinct.reduce((acc, next) => {
			if (group.every(p => p.includes(next))) {
				return acc + 1;
			}
			return acc;
		}, 0);

		count += groupCount;
	}
	console.log(count);
}
// part 1
	// const fullCount = list.reduce((acc, next) => {
	// 	return acc + countDistinct(next);
	// }, 0);

main();
