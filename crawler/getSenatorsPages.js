const request = require('request');
const cheerio = require('cheerio');
const utils = require('./utils');

const rootSenatorPage = 'https://www.senate.gov/senators/contact/';

const getSenatorsPages = () => {
	return new Promise((resolve, reject) => {
		request(rootSenatorPage, (err, response, body) => {
			utils.sanityCheck(err, response, body);

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
					if (e instanceof TypeError) {
						console.log('no valid href');
					} else {
						reject(e);
					}
				}
			});
			resolve(senators);
		});
	});
};

module.exports = getSenatorsPages;
