const Group = require('../models/Group');

exports.create = async (req, res, next) => {
  try {
    const group = await Group.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(group);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const groups = await Group.find({ members: req.user._id });
    res.json(groups);
  } catch (err) { next(err); }
};

exports.detail = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members');
    res.json(group);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.groupId, req.body, { new: true });
    res.json(group);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Group.findByIdAndDelete(req.params.groupId);
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
