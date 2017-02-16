const getSenatorsPages = require('./getSenatorsPages');
const getFaxNumbers = require('./getFaxNumbers');


getSenatorsPages()
	.then(rawSenators => {
		console.log('Found all links to senator pages...')
		return Promise.all(rawSenators.map(getFaxNumbers));
	})
	.then(allSenators => {
		return allSenators.filter(sen => sen.faxNumbers && sen.faxNumbers.length);
	})
	.then(senatorsWithFaxes => {
		console.log(`CHECK OUT THESE SENS:\n ${senatorsWithFaxes}`);
		console.log(`Found ${senatorsWithFaxes.length} senators with fax numbers.`);

	})
	.catch(console.error);
