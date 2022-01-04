const express = require('express'); // Express permet une utilsation de node plus friendly
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const produitRoutes = require('./routes/produit.routes');
require ('dotenv').config({path:'./config/.env'}); //on configure le chemin de notre variable d'environnement
require ('./config/db'); 
const {checkUser, requireAuth, requireCors} = require('./middleware/auth.middleware')
const app = express(); //A chaque fois que l'on appelle app, on appelle express


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


//jwt
// Vérifie que c'est le même utilisateur pour chaque page
app.get('*', checkUser);
//Vérifie à la connexion sur le site si c'est un utilisateur connu
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

// app.use('*', requireCors)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });

// Routes
app.use('/api/user', userRoutes);
app.use('/api/produit', produitRoutes);


// Serveur

app.listen (process.env.PORT, () => { //On place l'écoute sur le port que l'on a définit dans .env
    console.log(`Listening on port ${process.env.PORT}`); //Attention, guillemet de touche 7.
})

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
  
//   app.get('/api/produit/', cors(corsOptions), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for only example.com.'})
//   })
