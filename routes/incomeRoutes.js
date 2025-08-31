const express = require('express');
const {
  addIncome,
  getAllIncome,
  deleteIncome,
} = require('../controllers/incomeController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/add', protect, addIncome);
router.post('/get', protect, getAllIncome);
router.delete('/:id', protect, deleteIncome);

module.exports = router;
