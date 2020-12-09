const fs = require('fs');


const resolveColors = (list, prev, colors) => {
	if (prev.length === 0) {
		return colors;
	}

	const curr = list.reduce((acc, next) => {
		prev.forEach(p => {
			if (next.children.map(c => `${c.style}-${c.color}`).includes(`${p.style}-${p.color}`)) {
				acc.push(next);
			}
		});
		return acc;

	}, []);

	return resolveColors(list, curr, colors.concat(curr.map(c => `${c.style}-${c.color}`)));
}

const resolve = (list, prev) => {
	if (prev.length === 0) {
		return 0;
	}

	return prev.reduce((acc, next) => {
		list.forEach(listBag => {
			if (`${next.color}-${next.style}` === `${listBag.color}-${listBag.style}`) {

				console.log(` - ${next.style}-${next.color}`, next.count);
				const childrenAmount = listBag.children.reduce((a, n) => {
					console.log(` --- ${n.style}-${n.color}`, n.count);
					return a + n.count
				}, 0);
				acc = acc + next.count + (next.count * resolve(list, listBag.children));
			}
		});
		return acc;
	}, 0);
}

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
	//dull olive bags contain 5 wavy purple bags, 2 plaid white bags, 4 vibrant magenta bags, 1 light brown bag.
	const numbers = fs.readFileSync('input.txt', {encoding:'utf8', flag:'r'});
	const list = numbers.split(/\n/).filter(n => n).map((r, i) => {
		const [ group, collection ] = r.split(' contain ');
		const [ groupStyle, groupColor, _ ] = group.split(' ').filter(n => n);
		const parent = { count: 1, style: groupStyle, color: groupColor };
		const children = collection.slice(0,-1).split(', ').map(c => {
			const [ count, style, color, _ ] = c.split(' ').filter(n => n);
			return { count: parseInt((count == 'no' ? '0' : count), 10), style, color, children: [] };
		});

		parent.children = children;

		return parent;
	});


	const shinyGold = list.find(l => `${l.style}-${l.color}` === 'shiny-gold');

	const amount = resolve(list, shinyGold.children);


	console.log(amount);




	// const colors = resolveColors(list, pass1, pass1.map(p => `${p.style}-${p.color}`));



	// console.log(getDistinctLetters(colors.sort()).length);

	




}

main();
