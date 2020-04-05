const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Client = require("../models/client");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.clientById = (req, res, next, id) => {
    Client.findById(id).exec((err, client) => {
        if (err || !client) {
            return res.status(400).json({
                error: "client not found"
            });
        }
        req.client = client;
        next();
    });
};

exports.read = (req, res) => {
    req.client.photo = undefined;
    return res.json(req.client);
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            name,
            mobile,
            city,
            password,
        } = fields;

        if (
            !name ||
            !mobile ||
            !city ||
            !password
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let client = new Client(fields);

        // 1kb = 1000
         // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            client.photo.data = fs.readFileSync(files.photo.path);
            client.photo.contentType = files.photo.type;
        }

        client.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let client = req.client;
    client.remove((err, deletedClient) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "client deleted successfully"
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            name,
            city,
            mobile,
            password
        } = fields;

        if (
            !name ||
            !city ||
            !mobile ||
            !password
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let client = req.client;
        client = _.extend(client, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            client.photo.data = fs.readFileSync(files.photo.path);
            client.photo.contentType = files.photo.type;
        }

        client.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

/**
 * sell / arrival
 * by sell = /clients?sortBy=sold&order=desc&limit=4
 * by arrival = /clients?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all clients are returned
 */

exports.list = (req, res) => {
    // let order = req.query.order ? req.query.order : "asc";
    // let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    // let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Client.find().exec((err, clients) => {
            if (err) {
                return res.status(400).json({
                    error: "client not found"
                });
            }
            res.json(clients);
        });
};

exports.photo = (req, res, next) => {
  if (req.client.photo.data) {
      res.set("Content-Type", req.client.photo.contentType);
      return res.send(req.client.photo.data);
  }
  next();
};
