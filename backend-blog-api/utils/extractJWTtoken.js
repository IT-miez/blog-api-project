const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

function extractJWTtoken(req, res, next) {
    //console.log(req.headers)
    const parts = req.headers.authorization.split(' ');
    const token = parts[1];

    req.token = jwt.decode(token)
    console.log("Token is: "+req.token)
    next()
};

module.exports = extractJWTtoken