const logoutController = (req, res) => {
    // Clear the token cookie
    res.clearCookie("token", { httpOnly: true });

    // Send a response indicating successful logout
    res.status(200).json({ message: "Logout successful" });
};

module.exports = logoutController;
