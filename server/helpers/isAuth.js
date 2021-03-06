const jwt = require('jsonwebtoken');

const accessTokenSecret = require('../../config/config.json').secret;

const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // "Bearer [JWT_TOKEN]"  => [JWT_TOKEN]

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = isAuth;