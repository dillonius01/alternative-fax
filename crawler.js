const request = require('request');
const cheerio = require('cheerio');

const rootSenatorPage = 'https://www.senate.gov/senators/contact/';

const sanityCheck = (err, response, body) => {
	if (err) {
		throw err;
	}
	if (response.statusCode !== 200) {
		console.log(`Responded with status ${response.statusCode}`);
	}
};


const getSenatorsPages = () => {
	return new Promise((resolve, reject) => {
		request(rootSenatorPage, (err, response, body) => {
			sanityCheck(err, response, body);

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
						senators.push(senator)
					}
				} catch (e) {
					if (e instanceof TypeError) {
						console.log('no valid href')
					} else {
						reject(e)
					}
				}
			});
			resolve(senators);
		});
	});
};


const getFaxNumbers = senator => {
	return new Promise((resolve, reject) => {
		request(senator.url, (err, response, body) => {
			sanityCheck(err, response, body);

			const $ = cheerio.load(body);
			let faxes = [];
			const tagTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p'];
			tagTypes.forEach(type => {

				let nodes = $(type);
				console.log('got dem nodes, ', nodes)

				Object.keys(nodes).forEach(key => {
					try {
						let html = nodes[key].text();
						if (html.match(/fax/i)) {
							console.log('FOUND A FAX TAG WITH html ', html)
							faxes.push(html);
						}
					} catch (e) {
						if (e instanceof TypeError) {
							console.log('no valid html');
						} else {
							reject(e);
						}
					}
				});
			});


			console.log('faxes are ', faxes);
			resolve(faxes);

		});
	});
};


getSenatorsPages()
.then(sens => {
	console.log(sens)
	return sens;
})
.then(sens => {
	getFaxNumbers(sens[0])
})
.then(faxes => {
	console.log('FINALLY got this', faxes)
})
.catch(console.error)
