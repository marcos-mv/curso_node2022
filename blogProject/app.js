// Carregando Módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const admin = require('./routes/admin')
const login = require('./routes/login')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
require('./models/Categoria')
require('./models/Postagem')
const Postagem = mongoose.model('postagens')
const Categoria = mongoose.model('categorias')

const usuarios = require('./routes/usuario')

const app = express()
const passport = require('passport')
require('./config/auth')(passport)

function autheticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('login/')
    }
}
// require('./config/auth.js')(passport)


//Configs

//Sessions

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 60 * 1000 }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

//Middleware

app.use((req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

// BodyParser

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//HandleBars

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', 'handlebars');

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogproject').then(() => {
    console.log('Conectado ao mongo.');
}).catch((err) => {
    console.log("Falha de conexão com o mongodb: " + err);
})

//Public

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // console.log('Middleware')
    next();
})


//Rotas

app.get('/', (req, res) => {
    Postagem.find().populate('categoria').sort({ data: 'desc' }).then((postagens) => {
        res.render('index', { postagens: postagens });
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao carregar as postagens ' + err)
        res.redirect('/404');
    })
})

app.get('/404', (req, res) => {
    res.send('Erro 404!')
})

app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({ slug: req.params.slug }).then((postagem) => {
        if (postagem) {
            res.render('postagem/index', { postagem: postagem })
        } else {
            req.flash("error_msg", 'Essa postagem não existe.');
            res.redirect('/');
        }
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno')
        res.redirect('/');
    })
})

app.get('/categorias', (req, res) => {
    Categoria.find().then((categorias) => {
        res.render('categorias/index', { categorias: categorias })
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao listar as categorias ' + err)
        res.redirect('/')
    })
})

app.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({ slug: req.params.slug }).then((categoria) => {
        if (categoria) {
            Postagem.find({ categoria: categoria._id }).then((postagens) => {

                res.render('categorias/postagens', { postagens: postagens, categoria: categoria })

            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao listar os Posts')
                res.redirect('/')
            })

        } else {
            req.flash('error_msg', 'Esta categoria não existe')
            res.redirect('/')
        }
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao carregar a página desta categoria')
        res.redirect('/')
    })
})

app.get('/posts', (req, res) => {
    res.send('Lista de posts.');
})

app.use('/login', login)
app.use('/usuarios', usuarios);
app.use('/admin', autheticationMiddleware, admin);








//Outros

const PORT = 5004
app.listen(PORT, () => {
    console.log(`Servidor online no http://localhost:${PORT}`);
})