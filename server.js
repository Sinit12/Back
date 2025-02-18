const express = require('express');
const mongoose = require('mongoose');
const cors =require ('cors');
const app = express();
const port = process.env.PORT || 5000; // Use environment variable or default port 5000

app.use(cors({
  origin: 'https://my-app-1-t5lq.onrender.com' // Replace with your React app's port
}));


// MongoDB connection string (replace with your Atlas details)
const uri = "mongodb+srv://sinit:chebude@cluster0.1ttll.mongodb.net/bolg?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Database Connected'))
  .catch(err => console.error(err));

// Define your Express routes here (covered later)
const User = require('./models/user');

// Create a user (POST request)
app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Get all users (GET request)
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
// Update a user by ID (PUT request with ID param)
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
// Delete a user by ID (DELETE request with ID param)
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
app.listen(port, () => console.log(`Server listening on port ${port}`));
