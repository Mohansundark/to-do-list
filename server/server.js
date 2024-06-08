const express = require("express");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const mongoose = require("mongoose");
const requireAuth = require("./middleware/requireAuth");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Database Connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/to-do", requireAuth, todoRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Example route
app.get('/get', (req, res) => {
    res.send('Hello Frontend!')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
