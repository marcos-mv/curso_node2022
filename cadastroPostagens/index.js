const express = require("express");
const app = express();
const Sequelize = require('sequelize')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')
const port = 5003;

//Template Engine

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');

//Body Parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROTAS

app.get('/', function(req, res) {
    Post.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(function(posts) {
        // console.log(posts);
        res.render('home', { posts: posts });
    });
})

app.get('/cadastro', function(req, res) {
    res.render('formulario');
});

app.post('/add', function(req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function() {
        res.redirect('/');
    }).catch(function(erro) {
        res.send(`Houve um erro ${erro}`);
    });
    // res.send(`Texto ${req.body.titulo} Conteudo: ${req.body.conteudo}`);
});

app.get('/deletar/:id', function(req, res) {
    Post.destroy({
        where: { 'id': req.params.id }
    }).then(function() {
        res.redirect('/');
    }).catch(function(erro) {
        res.redirect('/');
    })
})

app.listen(port, function() {
    console.log(`Seu servidor está ativo na porta http://localhost:${port}`);
});