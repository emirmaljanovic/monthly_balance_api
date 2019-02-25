import Transaction from '../models/transaction.model';
import MonthController from './month.controller';

const set = async (req, res) => {
  const newTransaction = new Transaction(req.body);
  
  try {
    let savedTransaction = await newTransaction.save();

    return res.status(200).json(await MonthController.calcMonthValues(savedTransaction));
  } catch(err) {
    res.status(400).json(err);
  }
};

const get = (req, res, next) => {
  Transaction.find({})
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json(err));
};

const getSpecific = (req, res, next) => {
  Transaction.findById(req.body.id)
    .then((transaction) => res.status(200).json(transaction))
    .catch((err) => res.status(400).json(err));
};

export default {
  set,
  get,
  getSpecific
};