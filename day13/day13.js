const fs = require('fs');

const main = () => {
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n/).filter(n => n).map((r, i) => {
		return r;
	});

	const departureTime = parseInt(list[0], 10);
	const buses = list[1].split(',').map(x => x === 'x' ? x : parseInt(x, 10));

	const nextBus = buses.map(b => {
		const rem = departureTime % b;
		const next = b - rem;
		return { id: b, mins: next };
	}).reduce((acc, bus) => {
		if (acc.mins >= bus.mins) {
			acc = bus;
		}
		return acc;
	});

	console.log(nextBus.id * nextBus.mins);

	const allBuses = buses.map((n, i) => ({ id: n, idx: i })).filter(b => b.id !== 'x');

	const [ firstBus, ...rest ] = allBuses;
	let interval = firstBus.id;

	const result = rest.reduce((acc, next) => {
		while ((acc + next.idx) % next.id !== 0) {
			acc += interval;
		}
		interval *= next.id;
		return acc;
	}, interval);

	console.log(result);
	

};

main();
