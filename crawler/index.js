const getSenatorsPages = require('./getSenatorsPages');
const getFaxNumbers = require('./getFaxNumbers');


let billCassidy = {
	name: 'Bill Cassidy',
	url: 'http://www.cassidy.senate.gov/'
}

getFaxNumbers(billCassidy)
.then(val => console.log('loogit dis!', val))

// getSenatorsPages()
// .then(sens => {
// 	return Promise.all(sens.map(getFaxNumbers));
// })
// .then(faxes => {
// 	console.log('FINALLY got this', faxes);
// })
// .catch(console.error);
