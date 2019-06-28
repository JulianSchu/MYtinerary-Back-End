const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-access-token');

    if(!token) return res.status(401).send('Please login or the user is unauthorized');
    
    try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
    }
    catch(err) {
        res.status(400).send('Token is not valid')
    }
}

module.exports = auth;