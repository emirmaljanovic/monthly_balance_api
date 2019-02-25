import mongoose from 'mongoose';

import Month from '../models/month.model';
import MonthsList from '../common/months.list';
import Transaction from '../models/transaction.model';

//MonthsList starts from 0 ('Jan')
const FROM_MONTH = 7;
const CURRENT_MONTH = new Date().getMonth();
const months = [];

for(let i = FROM_MONTH; i <= CURRENT_MONTH; i++) {
  months.push(new Month({
    title:      MonthsList[i],
    date:       i,
    income:     0,
    userId:     1, // HARD CODED USER
    endBalance: 0,
    trend: {
      amount: 0,
      status: 'stagnation'
    },
    transactions: [
      new Transaction({
        date: new Date(),
        amount:       23,
        description:  `Test transaction description for ${MonthsList[i]} month`,
        type:         '0'
      })
    ]
  }));
}

const seed = () => {
  Month.remove({})
   .then((response) => {
     for(let month of months) {
       month.save();
     }
   });
 };
 
 export default {
   seed
 };