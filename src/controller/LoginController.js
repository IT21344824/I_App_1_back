const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/authUtils");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials 1" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(400).json({ message: "Invalid credentials 2" });
        }

        const token = generateToken(user);
        console.log("Token generated successfully");
        return res.status(200).json({ user: user, token: token });

    } catch (error) {
        console.log("Error during login:", error);
        return res.status(400).json({ message: "Invalid credentials 3" });
    }
}

module.exports = { login };
