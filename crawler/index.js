const path = require('path');
const getSenatorsPages = require('./getSenatorsPages');
const getFaxNumbers = require('./getFaxNumbers');
const saveSenators = require('./saveSenators');
const fs = require('fs');

const rootSenatorPage = 'https://www.senate.gov/senators/contact/';


getSenatorsPages(rootSenatorPage)
	.then(rawSenators => {
		console.log('Found all links to senator pages...');
		return Promise.all(rawSenators.map(getFaxNumbers));
	})
	.then(allSenators => {
		return allSenators.filter(sen => sen.faxNumbers && sen.faxNumbers.length);
	})
	.then(senatorsWithFaxes => {
		// console.log(`CHECK OUT THESE SENS:\n `, senatorsWithFaxes);
		console.log(`\nFound ${senatorsWithFaxes.length} senators with fax numbers.`);
		let filePath;
		if (senatorsWithFaxes.length >= 60) { // only overwrite if no 403s
			filePath = path.join(__dirname, 'scraped.js');
		} else {															// cache with timestamp
			const dateString = Date.now().toString();
			const dir = path.join(__dirname, 'cached');
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			filePath = path.join(dir, `senators_${dateString}.js`);
		}
		return saveSenators(filePath, senatorsWithFaxes);
	})
	.then(() => {
		console.log(`Successfully saved to disk`);
	})
	.catch(console.error);
