import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema({
  local            : {
    email        : String,
    password     : String
  }
});

Schema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
Schema.methods.validPassword = (password) => bcrypt.compareSync(password, this.local.password);

export default mongoose.model('User', Schema);