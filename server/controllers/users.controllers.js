const { User } = require('../models/user.model');
const { Transfer } = require('../models/transfer.model');

const createAccount = async (request, response) => {
    try {
        const { name, password } = request.body;
        const accountNumber = Math.ceil(Math.random() * 10000000);
        const newUser = await User.create({ name, password, accountNumber });

        response.status(200).json({ newUser });
    } catch (error) {
        console.log(error);
    }
};

const login = async (request, response) => {
    try {
        const { accountNumber, password } = request.body;
        const foundUser = await User.findOne({
            where: { accountNumber, password },
        });

        if (!foundUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User not found for the providen credentials',
            });
        }

        response.status(200).json({ foundUser });
    } catch (error) {
        console.log(error);
    }
};

const getAllTransactions = async (request, response) => {
    try {
        const { id } = request.params;
        const userTransactions = await Transfer.findAll({
            where: { senderUserId: id },
        });

        if (userTransactions.length === 0) {
            return res.status(400).json({
                status: 'error',
                message: `The user with the id ${id} hasn't registered transfers history`,
            });
        }

        response.status(200).json({ userTransactions });
    } catch (error) {
        console.log(error);
    }
};

const getAllUsers = async (req, res) => {
    const users = await User.findAll();

    res.status(200).json({ users });
};

module.exports = { createAccount, login, getAllTransactions, getAllUsers };
