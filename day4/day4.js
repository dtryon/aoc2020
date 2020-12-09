const fs = require('fs');

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].sort();

const numberBetween = (v, min, max)  => {
	const parsed = parseInt(v, 10);
	if (!parsed) { return false; } 
	return parsed >= min && parsed <= max;
};

const size = (v, n) => v.trim().length === n;

const runFieldRule = (key, value) => {
	if (!value) {
		return false;
	}
	switch(key) {
		case 'byr':
			return size(value, 4) && numberBetween(value, 1920, 2002);
		case 'iyr':
			return size(value, 4) && numberBetween(value, 2010, 2020);
		case 'eyr':
			return size(value, 4) && numberBetween(value, 2020, 2030);
		case 'hgt':
			if (value.endsWith('in')) {
				const n = value.slice(0, value.length - 2);
				return numberBetween(n, 59, 76);
			}
			if (value.endsWith('cm')) {
				const n = value.slice(0, value.length - 2);
				return numberBetween(n, 150, 193);
			}
			return false;
		case 'hcl':
			return /^#([0-9]|[a-f]){6}$/gm.test(value);
		case 'ecl':
			return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
		case 'pid':
			return /^[0-9]{9}$/gm.test(value);
		default:
			return false;
	}
}

const runRules = record => {
	const keys = Object.keys(record).sort();
	const hasValidKeys = keys.every((k, i) => k === required[i]) && keys.length >= 7;
	if (!hasValidKeys) {
		return false;
	}

	return required.reduce((acc, key) => {
		const value = record[key];
		return acc && runFieldRule(key, value);
	}, true);
}
const main = () => {
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n\s*\n/).filter(n => n).map((r, i) => {
		const pairs = r.split(/(\n|\s)/).filter(n => n).filter(n => !/(\s|\n)/.test(n));
		return pairs.map(p => p.split(':'));
	});

	const objList = list.map(item => {
		return item.reduce((acc, next) => {
			if (next[0] === 'cid') {
				return acc;
			}
			acc[next[0]] = next[1];
			return acc;
		}, {});
	});

	const count = objList.reduce((acc, record, idx) => {
		if(runRules(record)) {
			return acc + 1;
		}
		return acc;
	}, 0);

	console.log(count);
}

main();

// part 1
	// const count = list.reduce((acc, l, idx) => {
	// 	const all = l.filter(x => x[0] !== 'cid');
	// 	const keys = all.map(x => x[0]).sort();
	// 	const values = all.map(x => x[1]).filter(x => x);
	// 	if (keys.every((k, i) => k === required[i]) && values.length >= 7) {
	// 		return acc + 1;
	// 	};
	// 	return acc;
	// }, 0);
