module.exports = {

	sanityCheck: (err, response, body) => {
		if (err) throw err;
		if (response.statusCode !== 200) {
			console.log(`Responded with status ${response.statusCode}`);
		}
	}

};
