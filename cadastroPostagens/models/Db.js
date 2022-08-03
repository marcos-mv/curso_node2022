const Sequelize = require('sequelize')

const sequelize = new Sequelize('postapp', 'marcos', '2864492', {
    host: "localhost",
    dialect: 'mariadb'
});

sequelize.authenticate().then(function() {
    console.log("A conexão com o banco ocorreu com sucesso!!");
}).catch(function(erro) {
    console.log("Falha ao se conectar com o Banco: " + erro);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}