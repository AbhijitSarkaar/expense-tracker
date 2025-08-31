const Income = require('../models/Income');

const addIncome = async (req, res) => {
  const userId = req.user.id;

  const { icon, source, amount, date } = req.body;
  if (!source || !amount) {
    return res.status(400).json({
      message: 'Fields missing ',
    });
  }

  try {
    const income = new Income({
      userId,
      icon,
      source,
      amount,
    });

    await income.save();
    return res.status(201).json({
      message: 'new income created',
      income,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error adding income',
      error: error.message,
    });
  }
};

const getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = {
  addIncome,
  getAllIncome,
  deleteIncome,
};
