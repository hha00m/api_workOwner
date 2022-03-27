const _ = require('lodash');
const Town = require('../models/town');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.townById = (req, res, next, id) => {
  Town.findById(id).exec((err, town) => {
    if (err || !town) {
      return res.status(400).json({
        error: 'town not found',
      });
    }
    console.log('town found ...');
    req.town = town;
    next();
  });
};

exports.read = (req, res) => {
  req.town.photo = undefined;
  return res.json(req.town);
};

exports.create = (req, res) => {
  const town = new Town(req.body);
  town.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
exports.remove = (req, res) => {
  Town.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      message: 'town deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};
exports.update = (req, res) => {
  Town.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name,
      note: req.body.note,
      government: req.body.government,
      driver: req.body.driver,
      center: req.body.center,
      allocated: req.body.allocated,
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })


};

/**
 *  /api/towns?current=1&pageSize=20&sorter=
 *
 *
    let order = req.query.order ? req.query.order : "asc";
 * let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
 * let limit = req.query.limit ? parseInt(req.query.limit) : 6;
 */

exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const q = req.query.name ? { $text: { $search: req.query.name } } :
    req.query.note ? { $text: { $search: req.query.note } } : req.query.government ? { $text: { $search: req.query.government } } : {}

  Town
    .find(q)
    .populate('government', 'name _id')
    .populate('driver', 'name _id')
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
exports.townsByGovernment = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const q = req.query.name ? { $text: { $search: req.query.name } } :
    req.query.note ? { $text: { $search: req.query.note } } : req.query.government ? { $text: { $search: req.query.government } } : {}

  Town
    .find({ government: req.query.governmentId })
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
exports.townsNotAlocated = (req, res) => {
  try {
    Town
      .find({ allocated: null })
      .populate('government', 'name _id')
      .populate('driver', 'name _id')
      // .skip(pageSize * current)
      // .limit(pageSize)
      .sort({ name: 1 })
      .then((towns) => {
        res.json({
          data: towns,
          success: true,
          total: towns.length,
        });
      }).catch((err) => {
        return res.status(400).json({
          success: false,
          error: 'Town not found',
        })
      })
  }
  catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Towns not found',
    })
  }
};
