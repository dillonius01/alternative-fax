const path = require('path');
const getSenatorsPages = require('./getSenatorsPages');
const getFaxNumbers = require('./getFaxNumbers');
const saveSenators = require('./saveSenators');

const rootSenatorPage = 'https://www.senate.gov/senators/contact/';


getSenatorsPages(rootSenatorPage)
	.then(rawSenators => {
		console.log('Found all links to senator pages...')
		return Promise.all(rawSenators.map(getFaxNumbers));
	})
	.then(allSenators => {
		return allSenators.filter(sen => sen.faxNumbers && sen.faxNumbers.length);
	})
	.then(senatorsWithFaxes => {
		// console.log(`CHECK OUT THESE SENS:\n `, senatorsWithFaxes);
		console.log(`\nFound ${senatorsWithFaxes.length} senators with fax numbers.`);
		const dateString = Date.now().toString();
		const filePath = path.join(__dirname, `senators_${dateString}.js`);
		return saveSenators(filePath, senatorsWithFaxes);
	})
	.then(() => {
		console.log(`Successfully saved to disk`);
	})
	.catch(console.error);
