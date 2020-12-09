const fs = require('fs');


const run = (list, pointer, accumulator, visited) => {
	if (pointer >= list.length) {
		return { status: 'done', accumulator };
	}
	if (visited.includes(pointer)) {
		return { status: 'looped', visited };
	}
	const { opp, value } = list[pointer];
	switch(opp) {
		case 'acc':
			accumulator+=value;
			visited.push(pointer);
			return run(list, pointer+1, accumulator, visited);
		case 'jmp':
			visited.push(pointer);
			return run(list, pointer+value, accumulator, visited);
		case 'nop':
			visited.push(pointer);
			return run(list, pointer+1, accumulator, visited);
	}
}

const flip = (list, idx) => {
	if (list[idx].opp === 'nop') {
		list[idx].opp = 'jmp';
	} else {
		list[idx].opp = 'nop';
	}
}

const main = () => {
	//dull olive bags contain 5 wavy purple bags, 2 plaid white bags, 4 vibrant magenta bags, 1 light brown bag.
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n/).filter(n => n).map((r, i) => {
		const [opp, value] = r.split(' ');
		return { opp, value: parseInt(value, 10) };
	});

	let result = { status: '' };
	let firstVisited = [];
	let i = 0;
	let flipped = -1;

	while(result.status !== 'done') {
		result = run(list, 0, 0, []);

		if (result.status === 'looped') {
			if (firstVisited.length === 0) {
				firstVisited = result.visited.filter(v => list[v].opp !== 'acc');
			}
			
			if (flipped !== -1) {
				flip(list, firstVisited[i-1]);
			}
			
			flip(list, firstVisited[i]);
			flipped = i;
		}
		i++;
	}

	console.log(result);



}

main();
