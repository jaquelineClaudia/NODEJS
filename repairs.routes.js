const express = require('express');

const {
  getPendingRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

const router = express.Router();

router.route('/').get(getPendingRepairs).post(createRepair);

router
  .route('/:id')
  .get(getRepairById)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = { repairsRouter: router };
