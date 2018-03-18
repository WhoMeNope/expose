const http = require("http");
const fetch = require("node-fetch");
const ip = require("ip");

let logEnabled = false;

function start(portLocal = 3000, portPublic = 3000)
{
	http
		.createServer((request, response) => {
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
					response.statusCode = 500;
					response.end(error);
				});
		})
		.listen(portPublic, ip.address(), 511, (err) => {
			if(logEnabled) {
				if(err) {
					console.err(`Could not expose http://localhost:${portLocal} on http://${ip.address()}:${portPublic}`, err);
				}
				console.log(`Exposing \thttp://localhost:${portLocal}\nOn \t\thttp://${ip.address()}:${portPublic}`);
			}
		});
}

if(require.main === module) {
	//called directly

	logEnabled = true;

	const portLocal = (process.argv.length >= 2 && parseInt(process.argv[2])) || 3000;
	const portPublic = (process.argv.length >= 3 && parseInt(process.argv[3])) || 3000;

	start(portLocal, portPublic);
}

module.exports = start;
