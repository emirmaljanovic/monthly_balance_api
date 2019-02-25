import Expense from '../models/expense.model';

const get = (req, res, next) => {
  Expense.find({})
    .then(response => res.json(response))
    .catch(response => res.json(err, 400));
}

const getSpecific = (req, res, next) => {
  Expense.findById({})
    .then(response => res.json(response))
    .catch(response => res.json(err, 400));
}

export default {
  get,
  getSpecific
};