// const User = require("../models/UserModel");

// module.exports.getLikedMovies = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const user = await await User.findOne({ email });
//     if (user) {
//       return res.json({ msg: "success", movies: user.likedMovies });
//     } else return res.json({ msg: "User with given email not found." });
//   } catch (error) {
//     return res.json({ msg: "Error fetching movies." });
//   }
// };

// module.exports.addToLikedMovies = async (req, res) => {
//   try {
//     const { email, data } = req.body;
//     const user = await await User.findOne({ email });
//     if (user) {
//       const { likedMovies } = user;
//       const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
//       if (!movieAlreadyLiked) {
//         await User.findByIdAndUpdate(
//           user._id,
//           {
//             likedMovies: [...user.likedMovies, data],
//           },
//           { new: true }
//         );
//       } else return res.json({ msg: "Movie already added to the liked list." });
//     } else await User.create({ email, likedMovies: [data] });
//     return res.json({ msg: "Movie successfully added to liked list." });
//   } catch (error) {
//     return res.json({ msg: "Error adding movie to the liked list" });
//   }
// };

// module.exports.removeFromLikedMovies = async (req, res) => {
//   try {
//     const { email, movieId } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       const movies = user.likedMovies;
//       const movieIndex = movies.findIndex(({ id }) => id === movieId);
//       if (!movieIndex) {
//         res.status(400).send({ msg: "Movie not found." });
//       }
//       movies.splice(movieIndex, 1);
//       await User.findByIdAndUpdate(
//         user._id,
//         {
//           likedMovies: movies,
//         },
//         { new: true }
//       );
//       return res.json({ msg: "Movie successfully removed.", movies });
//     } else return res.json({ msg: "User with given email not found." });
//   } catch (error) {
//     return res.json({ msg: "Error removing movie to the liked list" });
//   }
// };

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/UserModel');

// exports.signup = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = new User({ email, password });
//     await user.save();
//     res.status(201).json({ message: 'User created' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Movie-related controllers (for liked movies)
// exports.addToLikedMovies = async (req, res) => {
//   // Add movie to liked list logic here
// };

// exports.getLikedMovies = async (req, res) => {
//   // Get liked movies logic here
// };

// exports.removeFromLikedMovies = async (req, res) => {
//   // Remove movie from liked list logic here
// };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User created' });
  } catch (error) {
    console.error('Error in /signup:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.authenticate = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, isAuthenticated: true });
  } catch (error) {
    console.error('Error checking authentication:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
