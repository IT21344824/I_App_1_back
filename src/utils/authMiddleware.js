const jwt = require("jsonwebtoken");
const secretKey = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });

    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });

    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error("Token Verification error", err);
            return res.status(401).json({ message: "Forbidden: Invalid token " });

        }
        req.user = user;
        next();
    })
}

module.exports = { authenticateToken }







