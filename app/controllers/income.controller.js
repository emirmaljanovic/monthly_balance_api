import Income from '../models/income.model';

// Get all income items
const get = (req, res, next) => {
  Income.find({})
    .then(response => res.json(response))
    .catch(err => res.json(err, 400));
}

const getSpecific = (req, res, next) => {
  console.log(req.params.id);
  Income.findById(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(400).json(err));
}

export default {
  get,
  getSpecific
};