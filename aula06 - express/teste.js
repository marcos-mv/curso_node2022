const Sequelize = require('sequelize')

// conexão com o banco (sequilize = nome do banco, usuario, senha)

const sequelize = new Sequelize('testeNode', 'marcos', '2864492', {
    host: "localhost",
    dialect: 'mariadb'
});

sequelize.authenticate().then(function() {
    console.log("A conexão com o banco ocorreu com sucesso!!");
}).catch(function(erro) {
    console.log("Falha ao se conectar com o Banco: " + erro);
});

// Postagem

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

//INSERT no Banco na tabela postagens
Postagem.create({
    titulo: "Primeiro título",
    conteudo: "Testando criação de postagem utilizando create."
});

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});

// insert no banco na tabela usuarios
Usuario.create({
    nome: "Marcos",
    sobrenome: "Vinícius",
    idade: 29,
    email: "vinicius_kof36@hotmail.com"
});

//Usuario.sync({ force: true });