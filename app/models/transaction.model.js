import mongoose from 'mongoose';

const Schema = mongoose.Schema({
  date:         Date,
  amount:       Number,
  description:  String,
  type:         String // gonna be expense/income.name
})

export default mongoose.model('Transaction', Schema);