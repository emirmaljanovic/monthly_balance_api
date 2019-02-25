import Month from '../models/month.model';
import Transaction from '../models/transaction.model';
import Expense from '../models/expense.model';

const set = async (req, res) => {
  try {
    const newMonth = await new Month({ userId: 1 }).save();
    res.json(newMonth);
  } catch(err) {
    res.status(400).json(err);
  }
};

const update = async (req, res, next) => {
  try {
    const transactions = (req.body || []).map((transaction) => new Transaction(transaction));
    const month = await Month.findById(req.params.id);
    
    month.transactions = transactions;
    await month.save();

    res.json(month);
  } catch(err) {
    res.status(400).json(err);
  }
};

const get = (req, res, next) => {
  Month.find({})
    .then(response => res.json(response))
    .catch(err => res.json(err, 400));
};

const getSpecific = (req, res, next) => {
  Month.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => res.json(err, 400));
};

const getMonthTransactions = (req, res, next) => {
  Transaction.find({monthId: req.params.id})
    .then(response => res.json(response))
    .catch(err => res.json(err, 400));
};

const calcMonthValues = async (newTransaction) => {
  try {
    let month = await Month.findById(newTransaction.monthId);

    if (newTransaction.type === 'income') {
      month.income += newTransaction.amount;
    }

    month = await calcBalance(month);
    month = await calcTrend(month);

    return month;
  } catch(err) {
    return err;
  }
};

const calcBalance = async (month) => {
  try {
    let transactions = await Transaction.find({monthId: month.id});
    let sum = 0;
    
    transactions.forEach(transaction => {
      sum += transaction.amount;
    });
    
    month.endBalance = month.income - sum;
  
    return month;
  } catch(err) {
    return err;
  }
};

const calcTrend = async (month) => {
  try {
    const prevMonth = await findPrevMonth(month.date);

    console.log(prevMonth);
    
    month.trend.amount = (month.endBalance / prevMonth.endBalance -1) * 100;
    month.trend.status = month.trend.amount > 0 ? 'rising' : 'falling';
    
    let newMonth = await month.save();
  
    return newMonth;
  } catch(err) {
    return err;
  }
};

// TODO: Refactor this
const findPrevMonth = async (month_date) => {
  const prevMonth = new Date(month_date).getMonth();

  const months = await Month.find();
  
  return months.find(({ date }) => date == prevMonth);
};

export default {
  set,
  get,
  getSpecific,
  getMonthTransactions,
  calcMonthValues,
  update
};