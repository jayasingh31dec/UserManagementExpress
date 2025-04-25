const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER - Create user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user to DB
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const payload = { id: user.id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.send({ token });  // Return token as JSON response
      }
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ message: "Registration failed" });
  }
};

// LOGIN - Authenticate user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Compare passwords
    const isValidPWD = await bcrypt.compare(password, user.password);
    if (!isValidPWD) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    const payload = { id: user.id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.send({ token });  // Return token as JSON response
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ message: "Login failed" });
  }
};

// PROFILE - Return full user data (except password)
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return full user details
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// TRANSACTION PAGE
const transaction = async (req, res) => {
  res.status(200).send("This is the transaction page");
};

// WISHLIST PAGE
const wishlist = async (req, res) => {
  res.status(200).send("This is the wishlist page");
};

// EXPORT
module.exports = {
  register,
  login,
  profile,
  transaction,
  wishlist
};
