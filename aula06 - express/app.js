const express = require("express");
const res = require("express/lib/response");

const app = express();

const port = 5003;

//__dirname retorna o diretório absoluto da minha aplicação

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

app.get("/sobre", function(req, res) {
    res.sendFile(__dirname + "/html/sobre.html");
});

app.get("/blog", function(req, res) {
    res.sendFile(__dirname + "/html/blog.html");
});

//criando rota com parametros

//req recebe dados de uma requisição http
//res.send só pode ser enviado uma unica vez por rota

app.get("/ola/:nome/:idade/:profissao", function(req, res) {
    res.send(`<h1> Olá ${req.params.nome}</h1>` + `<h2> Sua idade é: ${req.params.idade}</h2>` + `<h2> Seu cargo é: ${req.params.profissao}</h2>`);
});



app.listen(port, function() {
    console.log(`Seu servidor está ativo na porta http://localhost:${port}`);
});

// sequelize é um ORM é um sistema que abstrai todo o banco