const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await userModel.signup(username, email, password);
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Set the cookie with httpOnly, sameSite, and maxAge properties
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none', // or 'lax' depending on your needs
            maxAge: 3600000 // 1 hour
        });

        // Send a success response
        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

const login = async (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body

    try {
        const user = await userModel.login(username, password);
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        console.log("Logged in");
        // Set the cookie with httpOnly, sameSite, and maxAge properties
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none', // or 'lax' depending on your needs
            maxAge: 3600000 // 1 hour
        });

        // Send a success response
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Invalid username or password" });
    }
}

module.exports = { addUser, login };
