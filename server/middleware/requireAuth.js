const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;


    if (!token) {
        return res.status(403).send("You are logged out!! \n Please Log in again !!!");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Failed to authenticate token" });
        }

        // If everything is good, save the decoded information to request object for use in other routes
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
