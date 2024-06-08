const express = require("express")
const userRoutes = require("./routes/userRoutes")
const todoRoutes = require("./routes/todoRoutes")
const mongoose = require("mongoose")
const requireAuth = require("./middleware/requireAuth")
const app = express();
const cookiPaser = require("cookie-parser")

app.use(express.json())
app.use(cookiPaser())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
app.use("/api/user", userRoutes);
app.use("/api/to-do",requireAuth, todoRoutes);

// Suggested code may be subject to a license. Learn more: ~LicenseLog:1696386271.
app.get('/get', (req, res) => {
    res.send('World!')
})

mongoose.connect(process.env.MONGODB_URL)
const port = process.env.PORT
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});