const User = require("../models/User");
const bcrypt = require("bcrypt");

async function signupUser(req, res) {
    try {
        // Log received data to inspect it
        console.log("Received data:", req.body);

        const { firstname, lastname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role: "customer"
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully", user: savedUser });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { signupUser };
