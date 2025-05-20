const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { signupSchema, loginSchema } = require("../utils/authValidator");
exports.signup = async (req, res) => {
  const { email, password, name, age, address } = req.body;

  if (!email || !password || !name || !age || !address) {
    return res.status(400).json({ msg: "All fields are required." });
  }
  const validation = signupSchema.safeParse(req.body);
  console.log("Validation result:", validation);
  if (!validation.success) {
    return res.status(400).json({
      msg: "Validation failed",
      errors: validation.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ msg: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      age,
      address,
    });

    await newUser.save();
    return res.status(201).json({ msg: "Signup successful!" });
  } catch (err) {
    console.error("Error in /signup route:", err.message);
    return res.status(500).json({ msg: "Server error." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required." });
  }
  const validation = loginSchema.safeParse(req.body);

  console.log("Validation result:", validation);
  if (!validation.success) {
    return res.status(400).json({
      msg: "Validation failed",
      errors: validation.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      age: user.age,
      address: user.address,
    };

    return res.status(200).json({ msg: "Login successful", user: userData });
  } catch (err) {
    return res.status(500).json({ msg: "Server error." });
  }
};
