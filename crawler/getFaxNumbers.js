const request = require('request');
const cheerio = require('cheerio');
const utils = require('./utils');


const getFaxNumbers = senator => {
	console.log('running for senator ', senator.name)
	return new Promise((resolve, reject) => {
		request(senator.url, (err, response, body) => {
			utils.sanityCheck(err, response, body);

			const $ = cheerio.load(body);

			let nodesWithFax = [];
			let $body = $('body');

			const recurse = node => {
				try {
					if (!node) return;
					const re = /fax/i;
	
					let $outerText =
						node
							.contents()
							.filter(function() {
								return this.nodeType === 3;		// filter out contents that aren't actual element
							})
							.text();
	
					// console.log('----------------------------outerText is ', $outerText)
	
					if ($outerText && $outerText.match(re)) {
						console.log('WE HAVE A MATCH!', node);
						nodesWithFax.push($outerText);
					}
					
					const kids = node.children();

					if (kids) {
						console.log('kiddos are ', kids);
	
						kids.each((i, elem) => {
							console.log('recursing over index ', i)
							recurse(elem)
						})
					}

				} catch (e) {
					console.error('got an error', e)
				}


			};

			recurse($body);

			console.log('nodesWithFax are ', nodesWithFax);
			resolve(nodesWithFax);

		});
	});
};

module.exports = getFaxNumbers;


/*
RECURSIVE
let wholething = $('body');

const recurse = node => {
	if (!node) return;
	const re = /fax/i;



	let html = node.html && node.html();
	console.log('text is ', html)
	if (html && html.match(re)) {
		console.log('WE HAVE A MATCH!', node);
		nodesWithFax.push(node);
	}

	if (node.children) {
		let kids = Array.from(node.children);
		
		kids.forEach(child => {
			console.log('starting recursive call...')
			recurse(child)
		});
	}
	
};


ITERATIVE 

let tagTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'address', 'p'];

tagTypes.forEach(tag => {

	let nodes = $(tag);

	console.log(`got all these ${tag}`, nodes);

})

*/
