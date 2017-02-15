const getSenatorsPages = require('./getSenatorsPages');
const getFaxNumbers = require('./getFaxNumbers');


getSenatorsPages()
.then(sens => {
	console.log(sens);
	return sens;
})
.then(sens => {
	getFaxNumbers(sens[0]);
})
.then(faxes => {
	console.log('FINALLY got this', faxes);
})
.catch(console.error);
