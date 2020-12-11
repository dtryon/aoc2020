const fs = require('fs');

const findUp = (x, y, list) => {
	const inRangeRows = list.slice(0, x);
	inRangeRows.reverse();
	const column = inRangeRows.map(row => row[y]);
	return column.find(v => v !== '.');
}

const findDown = (x, y, list) => {
	const inRangeRows = list.slice(x+1, list.length);
	const column = inRangeRows.map(row => row[y]);
	return column.find(v => v !== '.');
}

const findLeft = (x, y, list) => {
	const row = list[x];
	const inRangeValues = row.slice(0, y);
	inRangeValues.reverse();
	return inRangeValues.find(val => val !== '.');
}

const findRight = (x, y, list) => {
	const row = list[x];
	const inRangeValues = row.slice(y+1, row.length);
	return inRangeValues.find(val => val !== '.');
}

const findUpLeft = (x, y, list) => {
	const inRangeRows = list.slice(0, x);
	inRangeRows.reverse();
	const cells = inRangeRows.map((row, i) => row[y-(i+1)]);
	return cells.filter(n => n).find(val => val !== '.');
}

const findUpRight = (x, y, list) => {
	const inRangeRows = list.slice(0, x);
	inRangeRows.reverse();
	const cells = inRangeRows.map((row, i) => row[y+(i+1)]);
	return cells.filter(n => n).find(val => val !== '.');
}

const findDownLeft = (x, y, list) => {
	const inRangeRows = list.slice(x+1, list.length);
	const cells = inRangeRows.map((row, i) => row[y-(i+1)]);
	return cells.filter(n => n).find(val => val !== '.');
}

const findDownRight = (x, y, list) => {
	const inRangeRows = list.slice(x+1, list.length);
	const cells = inRangeRows.map((row, i) => row[y+(i+1)]);
	return cells.filter(n => n).find(val => val !== '.');
}


shouldChangeStepTwo = (x, y, list) => {
	const value = list[x][y];

	const up = findUp(x, y, list);
	const down = findDown(x, y, list);
	const left = findLeft(x, y, list);
	const right = findRight(x, y, list);
	const upleft = findUpLeft(x, y, list);
	const upright = findUpRight(x, y, list);
	const downleft = findDownLeft(x, y, list);
	const downright = findDownRight(x, y, list);

	const allCells = [up, down, left, right, upleft, upright, downleft, downright ];
	const cellsToCheck = allCells.filter(n => n).filter(n => n !== '.');

	if (value === '#') { 
		return cellsToCheck.filter(n => n === '#').length >= 5;
	}

	if (value === 'L') {
		return cellsToCheck.every(c => c === 'L');
	}

	return false;
}

shouldChangeStepOne = (x, y, list) => {
	const value = list[x][y];

	const upBoundary = 0;
	const downBoundary = list.length-1;
	const leftBoundary = 0;
	const rightBoundary = list[0].length-1;

	let up;
	let down;
	let left;
	let right;
	let upleft;
	let upright;
	let downleft;
	let downright;

	if (x === upBoundary && y === leftBoundary) {
		down = list[x+1][y];
		right = list[x][y-1];
		downright = list[x+1][y+1];
	} else if (x === downBoundary && y === leftBoundary) {
		up = list[x-1][y];
		right = list[x][y+1];
		upright = list[x-1][y+1];
	} else if (x === upBoundary && y === rightBoundary) {
		down = list[x+1][y];
		left = list[x][y-1];
		downleft = list[x+1][y-1];
	} else if (x === downBoundary && y === rightBoundary) {
		up = list[x-1][y];
		left = list[x][y-1];
		upleft = list[x-1][y-1];
	} else if (x === upBoundary) {
		down = list[x+1][y];
		left = list[x][y-1];
		right = list[x][y+1];
		downleft = list[x+1][y-1];
		downright = list[x+1][y+1];
	} else if (x === downBoundary) {
		up = list[x-1][y];
		left = list[x][y-1];
		right = list[x][y+1];
		upleft = list[x-1][y-1];
		upright = list[x-1][y+1];
	} else if (y === leftBoundary) {
		up = list[x-1][y];
		down = list[x+1][y];
		right = list[x][y+1];
		upright = list[x-1][y+1];
		downright = list[x+1][y+1];
	} else if (y === rightBoundary) {
		up = list[x-1][y];
		down = list[x+1][y];
		left = list[x][y-1];
		upleft = list[x-1][y-1];
		downleft = list[x+1][y-1];
	} else {
		up = list[x-1][y];
		down = list[x+1][y];
		left = list[x][y-1];
		right = list[x][y+1];
		upleft = list[x-1][y-1];
		upright = list[x-1][y+1];
		downleft = list[x+1][y-1];
		downright = list[x+1][y+1];
	}

	const allCells = [up, down, left, right, upleft, upright, downleft, downright ];
	const cellsToCheck = allCells.filter(n => n).filter(n => n !== '.');

	if (value === '#') { 
		return cellsToCheck.filter(n => n === '#').length >= 4;
	}

	if (value === 'L') {
		return cellsToCheck.every(c => c === 'L');
	}

	return false;
}

const main = () => {
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n/).filter(n => n).map((r, i) => {
		return r.split('');
	});

	let currentCycleChanges = [];

	while(true) {
		//console.log(list);
		list.forEach((row, x) => row.forEach((val, y) => {
			if (shouldChangeStepTwo(x, y, list)) {
				currentCycleChanges.push([x, y]);
			}
		}));

		currentCycleChanges.forEach(([x, y]) => {
			const val = list[x][y];
			if (val === 'L') {
				list[x][y] = '#';
			} else if (val === '#') {
				list[x][y] = 'L'
			}
		});

		if (currentCycleChanges.length === 0) {
			break;
		}

		currentCycleChanges = [];
	}

	 let occupied = 0;
	 list.forEach((row, x) => row.forEach((val, y) => {
		 if (list[x][y] === '#') {
		 	occupied++;
		 }
	 }));

	console.log(occupied);

// const testGrid = [
// ['.', '.', '.', '.', '.', '.', '.', '#', '.'],
// ['.', '.', '.', '#', '.', '.', '.', '.', '.'],
// ['.', '#', '.', '.', '.', '.', '.', '.', '.'],
// ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
// ['.', '.', '#', 'L', '.', '.', '.', '.', '#'],
// ['.', '.', '.', '.', '#', '.', '.', '.', '.'],
// ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
// ['#', '.', '.', '.', '.', '.', '.', '.', '.'],
// ['.', '.', '.', '#', '.', '.', '.', '.', '.']
// ];

// 	console.log(testGrid[4][3]);

// 	console.log(findRight(4, 3, testGrid));
}



main();
