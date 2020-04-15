const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Town = require('../models/town');
const { errorHandler } = require('../helpers/dbErrorHandler');
// const { TableListItem,TableListParams } =require ('./data');

exports.townById = (req, res, next, id) => {
  Town.findById(id).exec((err, town) => {
    if (err || !town) {
      return res.status(400).json({
        error: 'town not found',
      });
    }
    req.town = town;
    next();
  });
};

exports.read = (req, res) => {
  req.town.photo = undefined;
  return res.json(req.town);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  // console.log(req);
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    // check for all fields
    const { name, city, center } = fields;
    console.log(name, city);
    if (!name || !city) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let town = new Town(fields);

    town.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let town = req.town;
  town.remove((err, deletedTown) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'town deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const town = req.town;
  town.name = req.body.name;
  town.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

/**
 *  /api/towns?current=1&pageSize=20&sorter=
 *
 *
    let order = req.query.order ? req.query.order : "asc";
 * let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
 * let limit = req.query.limit ? parseInt(req.query.limit) : 6;
 */
// mock tableListDataSource
const genList = (current, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `حلة ${index}`,
      city: 'babil',
      owner: '曲丽丽',
      desc: '这是一段描述',
      note: 'all good from hayder',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      updatedAt: new Date(),
      createdAt: new Date(),
      progress: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

exports.getRule = (req, res) => {

  let  dataSource = genList(1, 10);
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let order = req.query.order ? req.query.order : 'asc'; //increase
  let sorter = req.query.sorter ? req.query.sorter : 'name'; // sort by name
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0




  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current,
  };
  return res.json(result);
};
