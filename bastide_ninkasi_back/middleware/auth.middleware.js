const jwt = require ('jsonwebtoken');
const UserModel = require ('../models/user.model');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', "", {maxAge: 1});
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next();
            }
        })      
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken);
                next();
            }
        });
} else {
    console.log('No token')
}

};

// module.exports.requireCors = (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000').status(200)
    
//     if (req.method === OPTIONS){
//         res.setHeader('Acces-Control-Allow-Headers', 'Accept, Content-Type').status(200)
//     }
//     console.log(res);
//     next()
// }

// module.exports.requireCors = (req, res, next) => {
//     res.header("Acces-Control-Allow-Origin", "http://localhost:3000")
//     res.header("Access-Control-Allow-Headers", "Origin, X-requested-Width, Content-Type, Accept")
//     next()
// };