const app = require('express')();
const bodyParser = require('body-parser');
const volleyball = require('volleyball');
const Phaxio = require('phaxio');
const keys = require('./keys');
const phaxio = new Phaxio(keys.key, keys.secret);


const PORT = 8000;
const MitchMcConnell = '12022242499';


const sendFaxPromise = opt => {
	return new Promise((resolve, reject) => {
		phaxio.sendFax(opt, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
};

/*------------------LOGGING AND PARSING MIDDLEWARE--------------------*/

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/', (req, res, next) => {

	let faxBody = req.body;

	console.log('faxBody is', faxBody);

	const newFax = {
		to: MitchMcConnell,
		string_data: faxBody
	}

	sendFaxPromise(newFax)
		.then(data => {
			console.log('Fax away!', data);
			res.json(data);
		})
		.catch(next);

});



app.use((req, res, next) => {
	let err = new Error('Route not found');
	err.status = 404;
	next(err);
});


app.use((err, req, res, next) => {
	console.log('we has an error', err);
	res.status = err.status || 500;
	res.json(err);
});


app.listen(PORT, () => {
	console.log(`Gonna send dem faxes when you hit ${PORT}`);
});
