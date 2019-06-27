const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-access-token');

    if(!token) {
        res.status(401).json({msg: 'please login or the user is unauthorized'});
    }

    try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
    }
    catch(err) {
        res.status(400).json({err, msg: 'Token is not valid'})
    }
}

module.exports = auth;