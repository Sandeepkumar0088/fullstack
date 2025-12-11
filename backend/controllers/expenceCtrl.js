const Expense = require('../models/Expense');
const Group = require('../models/Group');
const { Parser } = require('json2csv');

exports.create = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (err) { next(err); }
};

exports.listByGroup = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ group: req.params.groupId })
      .populate('paidBy participants.user');
    res.json(expenses);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expense);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

exports.exportCSV = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ group: req.params.groupId }).lean();
    const fields = ['title', 'amount', 'paidBy', 'category', 'date'];
    const parser = new Parser({ fields });
    const csv = parser.parse(expenses);
    res.header('Content-Type', 'text/csv');
    res.attachment('report.csv');
    res.send(csv);
  } catch (err) { next(err); }
};
