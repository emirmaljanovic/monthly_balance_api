import express from 'express';

import Controllers from '../controllers';

const {
  IncomeController,
  ExpenseController,
  MonthController,
  TransactionController,
  UserController
} = Controllers;

const Router = express.Router();

Router.get('/', (req, res, next) => {
  res.write('Welcome to API home!');
  res.end();
});

Router.get('/signup', UserController.signup);
Router.get('/login', UserController.login);
Router.get('/logout', UserController.logout);

Router.get('/income', IncomeController.get);
Router.get('/income/:id', IncomeController.getSpecific);

Router.get('/expense', ExpenseController.get);
Router.get('/expense/:id', ExpenseController.getSpecific);

Router.get('/month', MonthController.get);
Router.get('/month/:id', MonthController.getSpecific);
// Router.get('/month/:id/transactions', MonthController.getMonthTransactions);
Router.post('/month', MonthController.set);
Router.post('/month/:id', MonthController.update); // Use PATCH

// Router.get('/transaction', TransactionController.get);
// Router.get('/transaction/:id', TransactionController.getSpecific);
// Router.post('/transaction', TransactionController.set);

export default Router;