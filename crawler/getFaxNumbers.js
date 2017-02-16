const request = require('request');
const cheerio = require('cheerio');
const utils = require('./utils');


module.exports = senator => {

	return new Promise((resolve, reject) => {
		request(senator.url, (err, response, body) => {
			utils.sanityCheck(err, response, reject);

			try {
				const $ = cheerio.load(body);

				let faxNumbers = [];
				let bodyText = $('body').html();

				let re = /fax.*(\d{3})\)?\s*-?(\d{3})\s*-?(\d{4})/gi;

				let match = re.exec(bodyText);

				while (match) {
					let num = +`${match[1]}${match[2]}${match[3]}`;
					faxNumbers.push(num);
					match = re.exec(bodyText);
				}

				senator.faxNumbers = faxNumbers; // attach fax nums to senator
				senator.name = senator.name.trim(); // remove whitespace
				resolve(senator);

			} catch (e) {
				reject(e);
			}
		});
	});
};

