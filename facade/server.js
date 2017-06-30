const http = require('http');

const tenant = getParam('--tenant', 'tenant-svc:80');
const user = getParam('--user', 'user-svc:80');
const port = getParam('--port', '18080');


const handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  Promise.all([
  	httpGet(`http://${tenant}`),  // call backend tenant service 
  	httpGet(`http://${user}`)     // call backend user service
  	]).then(rs => {
  		response.writeHead(200);
  		response.end(`tenant:${rs[0]}, upn:${rs[1]}`);
  	}).catch(e => console.log(e));
};
const www = http.createServer(handleRequest);
www.listen(port);

function httpGet(url, cb) {
	return new Promise((resolve, reject) => {
		console.log('access url:' + url);
		http.get(url, (res) => {
		  	let rawData = '';
		  	res.on('data', (chunk) => {rawData += chunk;});
		  	res.on('end', () => {
			    try {
			      resolve(rawData);
			    } catch (e) {
			      reject(e);
			    }
			});
		});
	})
}

function getParam(flag, defValue) {
	let argv = process.argv;
	return argv.indexOf(flag) !== -1? argv[argv.indexOf(flag) + 1] : defValue;
}