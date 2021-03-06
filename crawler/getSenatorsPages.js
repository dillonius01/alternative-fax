const request = require('request');
const cheerio = require('cheerio');
const utils = require('./utils');

module.exports = page => {

	return new Promise((resolve, reject) => {
		request(page, (err, response, body) => {
			utils.sanityCheck(err, response, reject);

			const $ = cheerio.load(body);
			const links = $('a');
			let senators = [];

			Object.keys(links).forEach(key => {
				try {
					let url = links[key].attribs.href;
					if (url.match(/^http:\/\/www\..*\.senate\.gov/)) {
						let senator = {
							url,
							name: links[key].children[0].data
						};
						senators.push(senator);
					}
				} catch (e) {
					if (e instanceof TypeError) return;
					else console.error(e);
				}
			});
			resolve(senators);
		});
	});
};
