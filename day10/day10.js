const fs = require('fs');

const cache = {};
const calcHash = list => list.reduce((acc, next) => acc + next, '');
const outOfRange = 10000;

const countBranches = (list) => {
	if (cache[calcHash(list)]) {
		return cache[calcHash(list)];
	}

	const [ first, second = outOfRange, third = outOfRange, fourth = outOfRange, ...tail ] = list;
	const diffOne = second - first;
	const diffTwo = third - second;
	const diffThree = fourth - third;

	const jumpOne = diffOne;
	const jumpTwo = diffOne + diffTwo;
	const jumpThree = diffOne + diffTwo + diffThree;

	if (second === outOfRange) {
		return 1;
	}

	const jumpOneList = [second, third, fourth, ...tail];
	const jumpTwoList = [third, fourth, ...tail];
	const jumpThreeList = [fourth, ...tail];

	if (jumpThree <= 3) {
		const ar = cache[calcHash(jumpOneList)] = countBranches(jumpOneList);
		const br = cache[calcHash(jumpTwoList)] = countBranches(jumpTwoList);
		const cr = cache[calcHash(jumpThreeList)] = countBranches(jumpThreeList);
		return ar + br + cr;
	}

	if (jumpTwo <= 3) {
		const dr = cache[calcHash(jumpOneList)] = countBranches(jumpOneList);
		const er = cache[calcHash(jumpTwoList)] = countBranches(jumpTwoList);
		return dr + er;
	}

	const fr = cache[calcHash(jumpOneList)] = countBranches(jumpOneList);
	return fr;
}

const main = () => {
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n/).filter(n => n).map((r, i) => {
		return parseInt(r, 10);
	});

	list.sort((a, b) => a - b);

	const builtIn = list[list.length-1]+3;

	list.push(builtIn);
	list.unshift(0);

	let prev = 0;
	let result = {};

	for(let i = 0; i < list.length; i++) {
		const curr = list[i];
		if (result[`${curr-prev}`]) {
			result[`${curr-prev}`]++;
		} else {
			result[`${curr-prev}`] = 1;
		}
		prev = curr;
	}

	const stepOne = result['1'] * result['3'];

	console.log(result);
	console.log(stepOne);
	
	const stepTwo = countBranches(list);

	console.log(stepTwo);

}

main();
