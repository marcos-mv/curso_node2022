const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
    function findUser(username) {
        return users.fin(item => item.username === username);
    }

    function findUserById(id) {
        return users.find(item => item._id === id);
    }

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (err) {
            console.log(err);
            return done(err, null)
        }
    })

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    }, (email, senha, done) => {
        try {
            const user = findUser(email);
            if (!user) {
                return done(null, false)
            }
            const isValid = bcrypt.compareSync(senha, user.senha);
            if (!isValid) {
                return done(null, false)
            }
            return done(null, user);
        } catch (err) {
            console.log(err);
            done(err, false)
        }
    }))

}


// 'use strict';

// /**
//  * Module dependencies.
//  */

// const mongoose = require('mongoose');
// const LocalStrategy = require('passport-local').Strategy;
// require('../models/Usuario')
// const Usuario = mongoose.model('usuarios')
// const bcrypt = require('bcryptjs')

// /**
//  * Expose
//  */

// module.exports = function(passport) {
//     new LocalStrategy({
//             usernameField: 'email',
//             passwordField: 'senha'
//         },
//         function(email, password, done) {
//             const options = {
//                 criteria: { email: email },
//                 select: 'name username email hashed_password salt'
//             };
//             User.load(options, function(err, user) {
//                 if (err) return done(err);
//                 if (!user) {
//                     return done(null, false, { message: 'Unknown user' });
//                 }
//                 if (!user.authenticate(password)) {
//                     return done(null, false, { message: 'Invalid password' });
//                 }
//                 return done(null, user);
//             });
//         }
//     );

//     passport.serializeUser(function(user, cb) {
//         process.nextTick(function() {
//             cb(null, { id: user.id, username: user.username });
//         });
//     });

//     passport.deserializeUser(function(user, cb) {
//         process.nextTick(function() {
//             return cb(null, user);
//         });
//     });
// }

// // module.exports = function(passport, LocalStrategy) {
// //     passport.use(new LocalStrategy({ username: 'email' }, (email, senha, done) => {

// //         Usuario.findOne({ email: email }).then((usuario) => {
// //             if (!usuario) {
// //                 return done(null, false, { message: 'Esta conta não existe.' })
// //             }

// //             bcrypt.compare(senha, usuario.senha, (erro, batem) => {
// //                 if (batem) {
// //                     return done(null, user)
// //                 } else {
// //                     return done(null, false, { message: "Senha incorreta" })
// //                 }
// //             })
// //         })
// //     }))

// //     //salva sessao
// //     passport.serializeUser((usuario, done) => {
// //         done(null, usuario.id)
// //     })

// //     passport.deserializeUser((id, done) => {
// //         User.findById(id, (err, usuario) => {
// //             done(err, user)
// //         })
// //     })
// // }


// // module.exports = function(passport) {
// //     passport.use(new localStrategy(
// //         function(username, password, done) {
// //             User.findOne({ username: username }, function(err, user) {
// //                 if (err) { return done(err); }
// //                 if (!user) { return done(null, false); }
// //                 if (!user.verifyPassword(password)) { return done(null, false); }
// //                 return done(null, user);
// //             });
// //         }
// //     ));

// //     passport.serializeUser((usuario, done) => {
// //         done(null, usuario.id)
// //     })

// //     passport.deserializeUser((id, done) => {
// //         User.findById(id, (err, usuario) => {
// //             done(err, user)
// //         })
// //     })
// // }