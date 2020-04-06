const formidable = require('formidable');
const _ = require('lodash');
const Message = require('../models/message');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.messageById = (req, res, next, id) => {
  Message.findById(id).exec((err, message) => {
    if (err || !message) {
      return res.status(400).json({
        error: 'message not found',
      });
    }
    req.message = message;
    next();
  });
};

exports.create = (req, res) => {
  const message = new Message(req.body);
  message.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.message);
};

exports.update = (req, res) => {
  const message = req.message;
  message.name = req.body.name;
  message.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const message = req.message;
  message.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'message deleted',
    });
  });
};


exports.list = (req, res) => {
  Message.find( )
      .exec((err, messages) => {
          if (err) {
              return res.status(400).json({
                  error: "message not found"
              });
          }
          res.json(messages);
      });
};
