const formidable = require("formidable");
const _ = require("lodash");
const Tracking = require("../models/tracking");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.trackingById = (req, res, next, id) => {
  Tracking.findById(id).exec((err, tracking) => {
        if (err || !tracking) {
            return res.status(400).json({
                error: "tracking not found"
            });
        }
        req.tracking = tracking;
        next();
    });
};


exports.create = (req, res) => {
  const tracking = new Tracking(req.body);
  tracking.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.tracking);
};

exports.update = (req, res) => {
  const tracking = req.tracking;
  tracking.name = req.body.name;
  tracking.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const tracking = req.tracking;
  tracking.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'tracking deleted',
    });
  });
};

exports.list = (req, res) => {
  Tracking.find()//{order:req.tracking.order}
      .exec((err, trackings) => {
          if (err) {
              return res.status(400).json({
                  error: "trackings not found"
              });
          }
          res.json(trackings);
      });
};
