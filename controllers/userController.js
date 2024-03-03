const User = require("../models/user.model");

// This function create Users
async function createUser(req, res) {
  const { body } = req;
  try {
    const userCount = await User.countDocuments();
    const newUser = await User.create({
      id: userCount + 1,
      name: body.name,
      email: body.email,
      age: body.age,
      password: body.password,
    });
    res.status(201).json(newUser);
  } catch (err) {
    if (!body.name || !body.email || !body.age || !body.password) {
      console.error("Error Creating a new User" + err);
      res.status(500).json({ error: "Please fill all the fields" });
    }
  }
  console.log("Cannot add this user");
  res.status(400).json({ message: "Email already exists" });
}

// This one shows all the Users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// This one show a user based on the id that we give
async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const userId = await User.findOne({ _id: id });

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userId);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// This one update the user
async function updateUser(req, res) {
  const { body, params: { id }} = req;
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!body.name || !body.email || !body.age || !body.password) {
      return res.status(400).json({ error: "Please fill the body form" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: body.name,
          email: body.email,
          age: body.age,
          password: body.password,
        },
      },
      { new: true }
    );

    console.log("User was updated successfully", updatedUser);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



// this one delete the selected User
async function deleteUser(req, res) {
  const id = req.params.id;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      console.log("User is not in our database");
      return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = await User.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "User deleted successfully" });
    console.log("User was deleted successfully", deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};