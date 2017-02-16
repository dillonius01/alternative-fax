const getSenatorsPages = require('./getSenatorsPages');
const getFaxNumbers = require('./getFaxNumbers');


getSenatorsPages()
.then(sens => {
	return Promise.all(sens.map(getFaxNumbers));
})
.then(sensWithFaxes => {

	let count = 0;

	sensWithFaxes.forEach(sen => {
		if (sen.faxNumbers && sen.faxNumbers.length) {
			count++;
		}
	});

	console.log(`Found ${count} senators with fax numbers`);
})
.catch(console.error);
