const http = require('http');
const port = getParam('--port', '18080');

const handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('100000003');
};
const www = http.createServer(handleRequest);
www.listen(port);

function getParam(flag, defValue) {
	let argv = process.argv;
	return argv.indexOf(flag) !== -1? argv[argv.indexOf(flag) + 1] : defValue;
}