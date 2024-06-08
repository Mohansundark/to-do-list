const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});



userSchema.statics.signup = async function (username, email, password) {
    if (validator.isEmpty(username) || validator.isEmpty(email) || validator.isEmpty(password)) {
        throw new Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email is invalid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
    const exists = await this.findOne({username:username})
    if (exists) {
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new this({
        username,
        email,
        password: hashedPassword
    });

    return user.save();
}

userSchema.statics.login = async function (username, password) {
    if (validator.isEmpty(username) || validator.isEmpty(password)) {
        throw new Error("All fields are required");
    }

    const user = await this.findOne({ username });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
}

module.exports = mongoose.model("User", userSchema);
