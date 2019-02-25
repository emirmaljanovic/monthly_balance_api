import mongoose from 'mongoose';

import Income from '../models/income.model';

const incomes = [
  new Income({ name: 'Bonus' }),
  new Income({ name: 'Paycheck' }),
  new Income({ name: 'Other' })
];

const seed = () => {
 Income.remove({})
  .then((response) => {
    for(let income of incomes) {
      income.save();
    }
  });
};

export default {
  seed
};