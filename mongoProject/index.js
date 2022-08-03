const mongoose = require('mongoose')

//configurando Mongoose

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/aprendendo', {}).then(() => {
    console.log("Conectado ao MongoDB!!")
}).catch((erro) => {
    console.log("Houve um erro ao se conectar ao MongoDB: " + erro);
});

// Model - Usuários
//Definindo o Model

const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String,
        require: false
    }

})

//Collection
mongoose.model('Usuarios', UserSchema)

const newUser = mongoose.model('Usuarios');

new newUser({
    nome: 'Marcos',
    sobrenome: 'Vinícius',
    email: 'vinicius_kof36@hotmail.com',
    idade: 29,
    pais: 'Brasil'
}).save().then(() => {
    console.log('Usuario criado com sucesso.');
}).catch((error) => {
    console.log('Erro ao criar usuário.' + error);
})