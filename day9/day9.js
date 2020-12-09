const fs = require('fs');


const calcSums = (arr, results = {}) => {
	const [ car, ...tail ] = arr;
	if (tail.length === 0) {
		return Object.keys(results).map(r => parseInt(r, 10));
	}
	

	tail.forEach(t => {
		const sum = t + car;
		if (!results[sum]) {
			results[sum] = true;
		}
	});

	return calcSums(tail, results);
}

const findSet = (arr, weakness, set = []) => {
	const [ car, ...tail ] = arr;
	if (tail.length === 0 || set.length > 0) {
		return set;
	}

	let possibleSum = car;
	set.push(car);
	for (let i = 0; i < tail.length; i++) {
		const t = tail[i];
		set.push(t);
		possibleSum += t;
		if (possibleSum == weakness) {
			break;
		}
		if (possibleSum > weakness) {
			set = [];
			break;
		}
	}

	return findSet(tail, weakness, set);
}

const main = () => {
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n/).filter(n => n).map((r, i) => {
		return parseInt(r, 10);
	});

	let weakness = 0;
	for(let i = 25; i < list.length; i++) {
		const check = list[i];
		const buffer = list.slice(i-25, i);

		if (!calcSums(buffer).find(n => n === check)) {
			weakness = check;
			break;
		}
	}

	console.log(weakness);

	const set = findSet(list, weakness).sort();

	console.log(set);

	const result = set[0] + set[set.length-1];

	console.log(result);
}

main();
