const request = require('request');
const cheerio = require('cheerio');
const utils = require('./utils');


const getFaxNumbers = senator => {

	return new Promise((resolve, reject) => {
		request(senator.url, (err, response, body) => {
			utils.sanityCheck(err, response, body);

			const $ = cheerio.load(body);

			let faxNumbers = [];
			let bodyText = $('body').html();

			let re = /fax.*(\d{3})\)?\s*-?(\d{3})\s*-?(\d{4})/gi;

			let matches = re.exec(bodyText); // matches is an array;
			console.log('GOT DEES MATCHES', matches);


			if (matches && matches.length) {
				matches = matches.slice(0, matches.length); // remove input, which is last index
				let p = 1;
				while (p < matches.length) { // account for multiple matches
					let num = `${matches[p]}${matches[p+1]}${matches[p+2]}`;
					faxNumbers.push(+num);
					p += 3;
				}
			}

			senator.faxNumbers = faxNumbers; // attach fax nums to senator

			resolve(senator);
		});
	});
};

module.exports = getFaxNumbers;

