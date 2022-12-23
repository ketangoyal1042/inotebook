const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisisajwtsecreatstring';

const getchusermiddleware = (req, res, next) => {
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Invalid authorization please use valid jwt token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data.tkn.id);
        req.id = data.tkn.id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid authorization please use valid jwt token" });
    }

}

module.exports = getchusermiddleware;
