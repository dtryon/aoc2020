const fs = require('fs');

const binarySearch = (identifier, rows, left) => {
	if (identifier.length === 0) {
		return rows[0]; 
	}

	const [ head, ...tail ] = identifier;
	const size = rows.length;
	const middle = size === 1 ? 0 : size / 2;

	if (head === left) {
		return binarySearch(tail, rows.slice(0, middle), left); 
	} else {
		return binarySearch(tail, rows.slice(middle, size), left);
	}
}

const main = () => {
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split('\n').filter(n => n);

	const rows = Array.from(Array(128)).map((x, i) => i);
	const columns = Array.from(Array(8)).map((x, i) => i);

	const results = list.map(next => {
		const rowIdentifier = next.substr(0, 7);
		const columnIdentifier = next.substr(7);

		const row = binarySearch(rowIdentifier, rows, 'F');
		const column = binarySearch(columnIdentifier, columns, 'L');
		return {
			row,
			column,
			id: (row * 8) + column
		};
	});

	const max = results.reduce((acc, next) => {
		if (next.id > acc) {
			return next.id;
		}
		return acc;
	}, 0);

	const ids = results.map(r => parseInt(r.id, 10));
	const sorted = ids.sort((a, b) => a - b);

	for(let i = 20; i < sorted.length - 20; i++) {
		if (sorted[i] - sorted[i-1] > 1) {
			console.log(sorted[i], sorted[i-1]);
		}
	}

}

main();
