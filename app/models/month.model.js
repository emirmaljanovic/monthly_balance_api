import mongoose from 'mongoose';
import Months from '../common/months.list';

const Schema = new mongoose.Schema({
  title:      { type: String, unique: true, default: Months[new Date().getMonth()] },
  date:       { type: String, default: new Date().getMonth() },
  income:     { type: Number, default: 0 }, // gonna be calculated from transaction -> type: income
  userId:     { type: Number, ref: 'User' },
  endBalance: { type: Number, default: 0 },
  trend: {
    amount: Number, // percentage number compared to the last motnh
    status: String // indicator whether the trend is rising or falling
  },
  transactions: { type: Array, default: [] }
});

export default mongoose.model('Month', Schema);