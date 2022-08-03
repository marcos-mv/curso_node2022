var http = require('http');

const port = 5002


// criando server http com node.

http.createServer(function(req, res) {
    res.end("Eai cara blz?");
}).listen(port);

console.log(`O servidor está online na porta ${port}`);