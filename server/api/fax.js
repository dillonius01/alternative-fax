const router = require('express').Router();
const Phaxio = require('phaxio');
const keys = require('../../keys');
const phaxio = new Phaxio(keys.key, keys.secret);

const MitchMcConnell = '12022242499';

/*------------------ UTILS --------------------*/

const sendFaxPromise = opt => {
	return new Promise((resolve, reject) => {
		phaxio.sendFax(opt, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
};

/*------------------ ROUTES --------------------*/


router.post('/', (req, res, next) => {

	let faxBody = JSON.stringify(req.body);

	console.log('faxBody is', faxBody);

	const newFax = {
		to: MitchMcConnell,
		string_data: faxBody
	};

	sendFaxPromise(newFax)
		.then(data => {
			console.log('Fax away!', data);
			res.json(data);
		})
		.catch(next);

});

module.exports = router;
