const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/UserModel"); // MongoDB user model
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/netflix-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const JWT_SECRET = "61451ea957b03ebd2d1f64b36f89a0cd71cbe738d840376f52eb5f67c0e42d6260df5d4fa13c815ea5f08fb9573b1e168a48e01f2ad806b24c609b5f0cd26503"; // Change this to a secure value

// Signup route
app.post("/api/user/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login route
app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Add movie to user list
app.post("/api/user/add", async (req, res) => {
  const { email, data } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.movies.push(data); // Assuming you store movies in a 'movies' field in User model
    await user.save();

    res.json({ message: "Movie added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
