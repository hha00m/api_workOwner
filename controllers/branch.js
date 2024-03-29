const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Branch = require('../models/branch');
const { errorHandler } = require('../helpers/dbErrorHandler');
exports.branchById = (id) => {
  return Branch.findById(id)
}

exports.read = (req, res) => {
  req.branch.photo = undefined;
  return res.json(req.branch);
};

exports.create = (req, res) => {
  // console.log("name is:",req.body.name," city is:", req.body.city ,"     :",req.body.description)

  const branch = new Branch(req.body);
  branch.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
exports.remove = (req, res) => {
  Branch.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      message: 'Branch deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};

exports.update = (req, res) => {
  Branch.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name,
      note: req.body.note,
      mobile: req.body.mobile,
      government: req.body.government,
      buy: req.body.buy,
      sell: req.body.sell,
      baghdadSell: req.body.baghdadSell,
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })


};

exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const q = req.query.name ? { $text: { $search: req.query.name } } :
    req.query.note ? { $text: { $search: req.query.note } } : req.query.government ? { $text: { $search: req.query.government } } : {}

  Branch
    .find(q)
    .populate('government', 'name _id')
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    .then((towns) => {
      res.json({
        data: towns,
        success: true,
        current,
        pageSize,
        total: towns.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'Town not found',
      })
    })

};