const http = require("http");
const fetch = require("node-fetch");
const ip = require("ip");

const portLocal = (process.argv.length >= 2 && parseInt(process.argv[2])) || 3000;
const portPublic = 3000;

http
	.createServer((request, response) => {
		console.log(request.url);
		fetch("http://localhost:" + portLocal + request.url,
			{
				method: request.method,
				redirect: 'follow',
				headers: request.headers,
				body: request.body
			})
			.then((handled) => {
				response.statusCode = handled.status;
				return handled.text();
			})
			.then((data) => {
				response.end(data);
			})
			.catch((error) => {
				console.error(error);
				response.statusCode = 500;
				response.end("Error Code: 500");
			});
	})
	.listen(portPublic, ip.address(), 511, (err) => {
		if(err) {
			console.err(`Could not expose http://localhost:${portLocal} on http://${ip.address()}:${portPublic}`, err);
		}
		console.log(`Exposing \thttp://localhost:${portLocal}\nOn \t\thttp://${ip.address()}:${portPublic}`);
	});
