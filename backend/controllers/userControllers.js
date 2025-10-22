const bcrypt = require("bcryptjs");
const User = require("../database/models/userModel");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // 2️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // 5️⃣ Success response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (err) {
        console.error("Error in user registration:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/models/userModel");

// Secret key (you should store this in .env)
const JWT_SECRET = process.env.JWT_SECRET

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password" });
        }

        // 2️⃣ Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3️⃣ Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 4️⃣ Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" } // token valid for 7 days
        );

        // 5️⃣ Send success response
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (err) {
        console.error("Error in user login:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




module.exports = { registerUser,loginUser };
