import mongoose from 'mongoose';

const Schema = mongoose.Schema({
  name: { type: String, unique: true, required: true, dropDups: true }
});

export default mongoose.model('Expense', Schema);