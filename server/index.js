const app = require('express')();
const bodyParser = require('body-parser');
const volleyball = require('volleyball');
const api = require('./api');
const PORT = 8000;


/*---------------LOGGING AND PARSING MIDDLEWARE-----------------*/

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*---------------API-----------------*/

app.use('/api', api);

/*---------------ERROR HANDLING-----------------*/

app.use((req, res, next) => {
	let err = new Error('Route not found');
	err.status = 404;
	next(err);
});


app.use((err, req, res, next) => {
	res.status(err.status || 500).json(err);
});

/*---------------START SERVER-----------------*/
app.listen(PORT, () => {
	console.log(`Gonna send dem faxes when you hit ${PORT}`);
});
