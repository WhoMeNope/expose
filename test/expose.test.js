const expose = require('../src/expose.js');
const ip = require("ip");
const fetch = require("node-fetch");
const http = require('http');

it('exposes localhost port to local network' ,() => {
	expect.assertions(1);

	const port = 3000;
	const message = 'Hello Node.js Server!';

	const requestHandler = (request, response) => {
		response.end(message);
	};
	const server = http.createServer(requestHandler);
	server.listen(port, (err) => {
		if (err) 
			throw error;
	});

	expose();

	return expect(
		fetch("http://" + ip.address() + ":" + port)
		.then((msg) => msg.text())
	).resolves.toEqual(message);
});
