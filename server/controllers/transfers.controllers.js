const { Transfer } = require('../models/transfer.model.js');
const { User } = require('../models/user.model');

const createTransaction = async (request, response) => {
    try {
        const { amount, senderUserId, receiverUserId } = request.body;
        const senderUser = await User.findOne({
            where: { id: senderUserId },
        });
        const receiverUser = await User.findOne({
            where: { id: receiverUserId },
        });

        if (!senderUser) {
            return response.status(400).json({
                status: 'error',
                message: 'this # is not registered yet',
            });
        }
        if (senderUser.amount < amount) {
            return response.status(400).json({
                message:
                    'The amount entered is greater than the account balance',
            });
        }
        const senderNewBalance = senderUser.amount - amount;
        const receiverNewBalance = receiverUser.amount + amount;

        await senderUser.update({ amount: senderNewBalance });
        await receiverUser.update({ amount: receiverNewBalance });

        const newTransaction = await Transfer.create({
            amount,
            senderUserId,
            receiverUserId,
        });

        res.status(201).json({ newTransaction });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createTransaction };
