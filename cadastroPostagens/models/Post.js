const db = require('./Db');

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

// uso unico pra criação da tabela
// Post.sync({ force: true })

module.exports = Post