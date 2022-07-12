const jwt = require('jsonwebtoken'); // to generate signed token


module.exports = function isLogined(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.', status: "error" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send({ message: 'Invalid token.', status: "error" });
    }
}
