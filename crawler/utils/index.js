module.exports = {

	sanityCheck: (err, response, reject) => {
		if (err) return reject(err);
		if (response.statusCode !== 200) {
			console.log(`Responded with status ${response.statusCode}`);
		}
	},

	proxies: require('./proxies'),
	userAgents: require('./userAgents')
};
