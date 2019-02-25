import mongoose from 'mongoose';

import Expense from '../models/expense.model';

const expenses = [
  new Expense({ name: 'Rent' }),
  new Expense({ name: 'Internet' }),
  new Expense({ name: 'Other' })
];

const seed = () => {
 Expense.remove({})
  .then((respponse) => {
    for(let expense of expenses) {
      expense.save();
    }
  });
};

export default {
  seed
};