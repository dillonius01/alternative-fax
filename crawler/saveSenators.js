const fs = require('fs');

module.exports = (fileName, contents) => {

	const start = 'module.exports =\n[\n';
	const end = '];\n';

	return new Promise((resolve, reject) => {

		let fileStream = fs.createWriteStream(fileName);

		fileStream.write(start); // write module.exports line

		contents.forEach(senator => {
			let senString = '\t\t' + JSON.stringify(senator) + ',\n';
			fileStream.write(senString);
		});

		fileStream.write(end); // write array closing bracket

		fileStream.on('error', err => {
			console.error('Error writing file:\n', err);
			reject(err);
		});

		fileStream.end(); // close stream
		resolve();
	});
};
