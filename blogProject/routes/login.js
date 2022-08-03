const express = require('express')
const { append } = require('express/lib/response')
const { default: mongoose } = require('mongoose')

const router = express.Router()
require('../models/Usuario')

const Usuario = mongoose.model('usuarios')

const bcrypt = require('bcryptjs')

const passport = require('passport')


// router.get('/login', (req, res) => {
//     res.render('usuarios/login')
// })

router.get('/', (req, res) => {
    if (req.query.fail) {
        res.render('usuarios/login', { message: 'Usuário inválido' })
    } else {

    }
    res.render('usuarios/login', { message: null })
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
}))


module.exports = router;