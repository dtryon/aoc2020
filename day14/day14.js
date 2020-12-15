const fs = require('fs');

const getMask = mask => {
	return mask.split('').reduce((acc, next, i) => {
		if (next !== 'X') {
			acc.push([next, i]);
		}
		return acc;
	}, []);
}

const applyMask = (mask, dec) => {
	let binary = parseInt(dec, 10).toString(2).padStart(36, '0');
	const binaryArr = binary.split('');
	mask.forEach(([bit, idx]) => {
		binaryArr[idx] = bit;
	});

	return parseInt(binaryArr.join(''), 2);
}

const getAddresses = (arr, curr, result) => {
	const [head, ...tail] = arr;
	if (tail.length === 0) {
		if (head === 'X') {
			return [[...curr, '0'], [...curr, '1']];
		} else {
			return [[...curr, head]];
		}
	}

	if (head === 'X') {
		return result.concat(
			getAddresses(tail, [...curr, '0'], result),
			getAddresses(tail, [...curr, '1'], result)
		);
	}
	return getAddresses(tail, [...curr, head], result);
}

const applyMask2 = (mask, dec) => {
	let binary = parseInt(dec, 10).toString(2).padStart(36, '0');
	const binaryArr = binary.split('');
	const binaryMask = mask.split('');
	binaryMask.forEach((m, i) => {
		if (m === 'X' || m === '1') {
			binaryArr[i] = m;
		}
	});

	const result = getAddresses(binaryArr, [], []).map(m => parseInt(m.join(''), 2));
	return result;
}

const main = () => {
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n/).filter(n => n).map((r, i) => {
		return r;
	});

	const memory = {};
	let currMask = null;

	list.forEach(command => {
		const [type, value] = command.split(' = ');
		if (type === 'mask') {
			currMask = value;
		} else if (type.startsWith('mem')) {
			const [t, r] = type.split('[');
			const address = r.slice(0, -1);
			const addresses = applyMask2(currMask, address);
			addresses.forEach(a => memory[a] = parseInt(value, 10));
		}
	});

	const result = Object.values(memory).reduce((acc, next) => acc + next);
	console.log(result);

	
	// const val = '000000000000000000000000000000X1101X';
	// const result = getAddresses(
	// 	val.split(''), [], []).map(m => parseInt(m.join(''), 2));

	// console.log(result);

};

main();
