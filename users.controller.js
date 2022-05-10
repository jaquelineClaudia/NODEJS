const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `User not found for the id ${id}`,
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    const { name, email } = req.body;

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `User not found for the id ${id}`,
      });
    }
    await user.update({ name, email });
    res.status(200).json({ status: 'Success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(200).json({
        status: 'Error',
        message: `User not found for the id ${id}`,
      });
    }

    await user.update({ status: 'Disabled' });
    res.status(200).json({ status: 'Success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
