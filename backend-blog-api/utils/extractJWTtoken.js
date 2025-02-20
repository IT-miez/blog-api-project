const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

function extractJWTtoken(req, res, next) {
    // console.log(req.headers)
    if (!req.headers.authorization) {
        return res
            .status(403)
            .json({ message: 'No authorization token: Not authorized' });
    }

    const parts = req.headers.authorization.split(' ');
    const token = parts[1];

    req.token = jwt.decode(token);
    next();
}

module.exports = extractJWTtoken;
