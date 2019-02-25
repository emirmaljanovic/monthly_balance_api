import IncomeSeed from './income.seed';
import ExpenseSeed from './expense.seed';
import MonthSeed from './month.seed';

export default () => {
  MonthSeed.seed();
  IncomeSeed.seed();
  ExpenseSeed.seed();
};