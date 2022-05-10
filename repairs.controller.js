const { Repair } = require('../models/repair.model');

const getPendingRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({ where: { status: 'pending' } });

    res.status(200).json({ repairs });
  } catch (error) {
    console.log(error);
  }
};

const getRepairById = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });

    if (!repair) {
      return res.status(404).json({
        status: 'Error',
        message: `Repair not found for the id ${id}`,
      });
    }

    res.status(200).json({ repair });
  } catch (error) {
    console.log(error);
  }
};

const createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const newRepair = await Repair.create({ date, userId });

    res.status(201).json({ newRepair });
  } catch (error) {
    console.log(error);
  }
};

const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });

    if (!repair) {
      return res.status(404).json({
        status: 'Error',
        message: `Repair not found for the id ${id}`,
      });
    }

    await repair.update({ status: 'Completed' });
    res.status(200).json({ status: 'Success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });

    if (!repair) {
      return res.status(404).json({
        status: 'Error',
        message: `Repair not found for the id ${id}`,
      });
    }

    await repair.update({ status: 'Cancelled' });
    res.status(200).json({ status: 'Success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPendingRepairs,
  getRepairById,
  createRepair,
  updateRepair,
  deleteRepair,
};
